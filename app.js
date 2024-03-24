const Joi = require("joi");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(cors());

const { Op, sql, QueryTypes } = require("sequelize");

const sequelize = require("./database");
const Restaurant = require("./restaurant");
const Items = require("./items");

sequelize.sync().then(() => console.log("db is ready"));

app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Listening on Port: ${PORT}`);
});

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

const initializeRequest = (query) => {
  let store_name = query.store_name === undefined ? "" : query.store_name;
  let sort_value =
    query.sort_value === undefined ? ["score", "random"] : query.sort_value;
  let prefecture_value =
    query.prefecture_value === undefined ? "random" : query.prefecture_value;
  let rating_min = query.rating_min === undefined ? 0 : query.rating_min;
  let rating_max = query.rating_max === undefined ? 5 : query.rating_max;
  let review_min = query.review_min === undefined ? 0 : query.review_min;
  let review_max = query.review_max === undefined ? 10000 : query.review_max;

  let lunch_min = query.lunch_min === undefined ? 0 : query.lunch_min;
  let lunch_max = query.lunch_max === undefined ? 50 : query.lunch_max;
  let dinner_min = query.dinner_min === undefined ? 0 : query.dinner_min;
  let dinner_max = query.dinner_max === undefined ? 50 : query.dinner_max;
  let latitude = query.latitude === undefined ? 0 : query.latitude;
  let longitude = query.longitude === undefined ? 0 : query.longitude;

  return {
    store_name,
    sort_value,
    prefecture_value,
    rating_min,
    rating_max,
    review_min,
    review_max,
    lunch_min,
    lunch_max,
    dinner_min,
    dinner_max,
    latitude,
    longitude,
  };
};

const handleQuery = (request) => {
  store_name = request.store_name;
  sort_value = request.sort_value;
  prefecture_value = request.prefecture_value;
  rating_min = request.rating_min;
  rating_max = request.rating_max;
  review_min = request.review_min;
  review_max = request.review_max;
  lunch_min = request.lunch_min;
  lunch_max = request.lunch_max;
  dinner_min = request.dinner_min;
  dinner_max = request.dinner_max;
  latitude = request.latitude;
  longitude = request.longitude;

  let store_query = [
    { store_name: { [Op.like]: `%${store_name}%` } },
    { store_name_english: { [Op.like]: `%${store_name}%` } },
    { address: { [Op.like]: `%${store_name}%` } },
    { address_english: { [Op.like]: `%${store_name}%` } },
  ];
  let score_query = {
    [Op.and]: { [Op.gte]: rating_min, [Op.lte]: rating_max },
  };
  let review_cnt_query = {
    [Op.and]: { [Op.gte]: review_min, [Op.lte]: review_max },
  };
  let lunch_min_query = {
    [Op.or]: [{ [Op.gte]: lunch_min * 1000 }, { [Op.is]: null }],
  };
  let lunch_max_query = {
    [Op.or]: [{ [Op.lte]: lunch_max * 1000 }, { [Op.is]: null }],
  };
  let dinner_min_query = {
    [Op.or]: [{ [Op.gte]: dinner_min * 1000 }, { [Op.is]: null }],
  };
  let dinner_max_query = {
    [Op.or]: [{ [Op.lte]: dinner_max * 1000 }, { [Op.is]: null }],
  };
  // let dinner_query = {
  //   [Op.or]: [
  //     {
  //       [Op.and]: [
  //         { [Op.gte]: dinner_min * 1000 },
  //         { [Op.lte]: dinner_max * 1000 },
  //       ],
  //     },
  //     { [Op.is]: null },
  //   ],
  // };

  let prefecture_query = { prefecture: { [Op.like]: "%%" } };
  if (prefecture_value && prefecture_value != "random") {
    prefecture_query = [];
    for (const prefecture of prefecture_value) {
      prefecture_query.push({
        prefecture: { [Op.like]: `%${prefecture.value}%` },
      });
    }
  }

  let sort_category = sort_value[0];
  let sort_direction = sort_value[1];
  let order_query = sequelize.random();
  if (sort_value && sort_direction != "random") {
    order_query = [[sort_category, sort_direction]];
  }

  return {
    store_query,
    score_query,
    review_cnt_query,
    lunch_min_query,
    lunch_max_query,
    dinner_min_query,
    dinner_max_query,
    prefecture_query,
    order_query,
  };
};

app.get("/restaurants/english", async (req, res) => {
  console.log(
    `\nquery:
    store name: ${req.query.store_name}
    sort value: ${req.query.sort_value}
    prefecture value: ${req.query.prefecture_value}
    rating min: ${req.query.rating_min}\t\trating max: ${req.query.rating_max}
    review min: ${req.query.review_min}\t\treview max: ${req.query.review_max}
    latitude: ${req.query.latitude}\t\tlongitude: ${req.query.longitude}
    lunch min: ${req.query.lunch_min * 1000}\t\tlunch max: ${
      req.query.lunch_max * 1000
    }
    dinner min: ${req.query.dinner_min * 1000}\t\tdinner max: ${
      req.query.dinner_max * 1000
    }\n`
  );

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const request = initializeRequest(req.query);
  const query = handleQuery(request);

  const restaurants = await Restaurant.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude))))`
          ),
          "distance",
        ],
      ],
    },
    where: {
      score: query.score_query,
      review_cnt: query.review_cnt_query,
      tabelog_lunch_budget_min: query.lunch_min_query,
      tabelog_lunch_budget_max: query.lunch_max_query,
      tabelog_dinner_budget_min: query.dinner_min_query,
      tabelog_dinner_budget_max: query.dinner_max_query,
      [Op.and]: [
        { [Op.or]: query.store_query },
        { [Op.or]: query.prefecture_query },
      ],
    },
    order: query.order_query,
    limit: limit,
    offset: (page - 1) * limit,
  });

  return res.send(restaurants);
});

// app.get("/restaurants/japanese/:id", async (req, res) => {
//   const schema = Joi.object({
//     name: Joi.string().min(1).required(),
//   });

//   const valid = schema.validate(req.body);

//   const requestedId = req.params.id;
//   const requestedRestaurant = await Restaurant.findOne({
//     where: { store_name: requestedId },
//   });
//   res.send(requestedRestaurant);
// });

// app.get("/restaurants/english/:id", async (req, res) => {
//   const schema = Joi.object({
//     name: Joi.string().min(1).required(),
//   });

//   const requestedId = req.params.id;

//   const requestedRestaurant = await Restaurant.findAll({
//     where: {
//       store_name_english: {
//         [Op.like]: `%${requestedId}%`,
//       },
//     },
//   });

//   if (requestedRestaurant == null) {
//     return res.send(new Restaurant({ store_name: "no match" }));
//   }
//   return res.send(requestedRestaurant);
// });

// app.get("/restaurants/", (req, res) => {
//   const id = req.params;
//   const key = req.query;

//   res.status(200).json({ info: "preset text" });
// });

// app.get("/", (req, res) => {
//   const parcel = req.body;
//   if (!parcel) {
//     return res.status(400);
//   }
//   res.status(200).send({ status: "received" });
// });
