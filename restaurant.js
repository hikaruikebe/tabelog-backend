const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class Restaurant extends Model {}

Restaurant.init(
  {
    store_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    store_name_english: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.DECIMAL,
    },
    review_cnt: {
      type: DataTypes.INTEGER,
    },
    tabelog_lunch_budget_min: {
      type: DataTypes.INTEGER,
    },
    tabelog_lunch_budget_max: {
      type: DataTypes.INTEGER,
    },
    tabelog_dinner_budget_min: {
      type: DataTypes.INTEGER,
    },
    tabelog_dinner_budget_max: {
      type: DataTypes.INTEGER,
    },
    customer_lunch_budget_min: {
      type: DataTypes.INTEGER,
    },
    customer_lunch_budget_max: {
      type: DataTypes.INTEGER,
    },
    customer_dinner_budget_min: {
      type: DataTypes.INTEGER,
    },
    customer_dinner_budget_max: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
    },
    url_english: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL,
    },
    longitude: {
      type: DataTypes.DECIMAL,
    },
    prefecture: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    address_english: {
      type: DataTypes.STRING,
    },
    prefecture_english: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "tabelog",
    tableName: "tabelogs",
    timestamps: false,
  }
);

module.exports = Restaurant;
