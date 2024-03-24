const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const { Op } = require("sequelize");

const sequelize = require("./database");
const Restaurant = require("./restaurant");

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

const initializeRequest = (req) => {
  let res = {};
  res.store_name = req.store_name === undefined ? "" : req.store_name;
  res.sort_value =
    req.sort_value === undefined ? ["score", "random"] : req.sort_value;
  res.prefecture_value =
    req.prefecture_value === undefined ? "random" : req.prefecture_value;
  res.genre_value = req.genre_value === undefined ? "random" : req.genre_value;
  res.rating_min = req.rating_min === undefined ? 0 : req.rating_min;
  res.rating_max = req.rating_max === undefined ? 5 : req.rating_max;
  res.review_min = req.review_min === undefined ? 0 : req.review_min;
  res.review_max = req.review_max === undefined ? 10000 : req.review_max;

  res.lunch_min = req.lunch_min === undefined ? 0 : req.lunch_min;
  res.lunch_max = req.lunch_max === undefined ? 50 : req.lunch_max;
  res.dinner_min = req.dinner_min === undefined ? 0 : req.dinner_min;
  res.dinner_max = req.dinner_max === undefined ? 50 : req.dinner_max;

  res.latitude = req.latitude === undefined ? 0 : req.latitude;
  res.longitude = req.longitude === undefined ? 0 : req.longitude;

  return res;
};

const handleQuery = (req) => {
  let res = {};

  res.store_query = [
    { store_name: { [Op.like]: `%${req.store_name}%` } },
    { store_name_english: { [Op.like]: `%${req.store_name}%` } },
    { address: { [Op.like]: `%${req.store_name}%` } },
    { address_english: { [Op.like]: `%${req.store_name}%` } },
  ];
  res.score_query = {
    [Op.and]: { [Op.gte]: req.rating_min, [Op.lte]: req.rating_max },
  };
  res.review_cnt_query = {
    [Op.and]: { [Op.gte]: req.review_min, [Op.lte]: req.review_max },
  };
  res.lunch_min_query = {
    [Op.or]: [{ [Op.gte]: req.lunch_min * 1000 }, { [Op.is]: null }],
  };
  res.lunch_max_query = {
    [Op.or]: [{ [Op.lte]: req.lunch_max * 1000 }, { [Op.is]: null }],
  };
  res.dinner_min_query = {
    [Op.or]: [{ [Op.gte]: req.dinner_min * 1000 }, { [Op.is]: null }],
  };
  res.dinner_max_query = {
    [Op.or]: [{ [Op.lte]: req.dinner_max * 1000 }, { [Op.is]: null }],
  };

  res.prefecture_query = { prefecture: { [Op.like]: "%%" } };
  if (req.prefecture_value && req.prefecture_value != "random") {
    res.prefecture_query = [];
    for (const prefecture of req.prefecture_value) {
      res.prefecture_query.push({
        prefecture: { [Op.like]: `%${prefecture.value}%` },
      });
    }
  }

  res.genre_query = { genre: { [Op.like]: "%%" } };
  if (req.genre_value && req.genre_value != "random") {
    res.genre_query = [];
    for (const genre of req.genre_value) {
      res.genre_query.push({
        genre: { [Op.like]: `%${genre.value}%` },
      });
    }
  }

  const sort_category = req.sort_value[0];
  const sort_direction = req.sort_value[1];
  res.order_query = sequelize.random();
  if (req.sort_value && sort_direction != "random") {
    res.order_query = [[sort_category, sort_direction]];
  }

  return res;
};

app.get("/restaurants/english", async (req, res) => {
  console.log(
    `\nquery:
    store name: ${req.query.store_name}
    sort value: ${req.query.sort_value}
    prefecture value: ${req.query.prefecture_value}
    genre value: ${req.query.genre_value}
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

  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const request = initializeRequest(req.query);
  const query = handleQuery(request);

  const restaurants = await Restaurant.findAll({
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
        { [Op.or]: query.genre_query },
      ],
    },

    order: query.order_query,
    limit: limit,
    offset: (page - 1) * limit,
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
  });

  // res.json(restaurants);
  console.log(restaurants.length);
  return res.send(restaurants);
});
