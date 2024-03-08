const Joi = require("joi");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(cors());

const { Op, Default } = require("sequelize");
const sequelize = require("./database");
const Restaurant = require("./restaurant");
const Items = require("./items");

sequelize.sync().then(() => console.log("db is ready"));

app.use(express.static("public"));
app.use(express.json());

const sort_dict = new Map([
  ["Ratings", "score"],
  ["Ascending", "ASC"],
  ["Descending", "DESC"],
  ["Random", sequelize.literal("rand()")],
]);

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

app.get("/restaurants/english", async (req, res) => {
  console.log(
    "english: ",
    req.query.store_name,
    req.query.sort_value,
    req.query.rating_min,
    req.query.rating_max,
    req.query.review_min,
    req.query.review_max
  );

  let store_name =
    req.query.store_name === undefined ? "" : req.query.store_name;
  console.log("sort: " + req.query.sort_value);
  let sort_value =
    req.query.sort_value === undefined ? "Select Sort" : req.query.sort_value;
  let rating_min =
    req.query.rating_min === undefined ? 0 : req.query.rating_min;
  let rating_max =
    req.query.rating_max === undefined ? 5 : req.query.rating_max;
  let review_min =
    req.query.review_min === undefined ? 0 : req.query.review_min;
  let review_max =
    req.query.review_max === undefined ? 10000 : req.query.review_max;

  console.log("sort_value: ", sort_value);
  let sort_category = sort_dict.get(sort_value.split(" ")[0]);
  let sort_direction = sort_dict.get(sort_value.split(" ")[1]);

  console.log(sort_value);
  if (!sort_value || sort_value === "Select Sort") {
    sort_category = "score";
    sort_direction = sequelize.literal("rand()");

    const restaurants = await Restaurant.findAll({
      where: {
        [Op.or]: [
          { store_name: { [Op.like]: "%" + store_name + "%" } },
          { store_name_english: { [Op.like]: "%" + store_name + "%" } },
        ],
        score: { [Op.and]: { [Op.gte]: rating_min, [Op.lte]: rating_max } },
        review_cnt: {
          [Op.and]: { [Op.gte]: review_min, [Op.lte]: review_max },
        },
      },
      order: sequelize.random(),
    });

    return res.send(restaurants);
  } else {
    const restaurants = await Restaurant.findAll({
      where: {
        [Op.or]: [
          { store_name: { [Op.like]: "%" + store_name + "%" } },
          { store_name_english: { [Op.like]: "%" + store_name + "%" } },
        ],
        score: { [Op.and]: { [Op.gte]: rating_min, [Op.lte]: rating_max } },
        review_cnt: {
          [Op.and]: { [Op.gte]: review_min, [Op.lte]: review_max },
        },
      },
      order: [[sort_category, sort_direction]],
    });

    return res.send(restaurants);
  }
});

app.get("/restaurants/japanese/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });

  const valid = schema.validate(req.body);

  const requestedId = req.params.id;
  const requestedRestaurant = await Restaurant.findOne({
    where: { store_name: requestedId },
  });
  res.send(requestedRestaurant);
});

app.get("/restaurants/english/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });

  const requestedId = req.params.id;

  const requestedRestaurant = await Restaurant.findAll({
    where: {
      store_name_english: {
        [Op.like]: "%" + requestedId + "%",
      },
    },
  });

  if (requestedRestaurant == null) {
    return res.send(new Restaurant({ store_name: "no match" }));
  }
  return res.send(requestedRestaurant);
});

app.get("/restaurants/", (req, res) => {
  const id = req.params;
  const key = req.query;
  // console.log(id, key);
  res.status(200).json({ info: "preset text" });
});

app.get("/", (req, res) => {
  const parcel = req.body;
  if (!parcel) {
    return res.status(400);
  }
  res.status(200).send({ status: "received" });
});
