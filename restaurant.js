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
    url: {
      type: DataTypes.STRING,
    },
    url_english: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    prefecture: {
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
    timestamps: false,
  }
);

module.exports = Restaurant;
