const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tabelog", "root", "root", {
  dialect: "sqlite",
  host: "../data/tabelog.db",
});

module.exports = sequelize;
