const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect-db");

const Basket = sequelize.define(
  "basket",
  {
    idBasket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_equipment: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

module.exports = Basket;
