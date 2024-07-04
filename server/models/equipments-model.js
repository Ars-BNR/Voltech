const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect-db");

const Equipments = sequelize.define(
  "equipments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_equip: DataTypes.STRING(225),
    price: DataTypes.INTEGER,
    pathimg: DataTypes.TEXT,
    short_info: DataTypes.JSONB,
    main_info: DataTypes.JSONB,
    description: DataTypes.JSONB,
  },
  {
    timestamps: false,
  }
);

module.exports = Equipments;
