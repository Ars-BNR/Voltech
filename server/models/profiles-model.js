const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect-db");

const Profiles = sequelize.define(
  "profiles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: { type: DataTypes.STRING, defaultValue: "user" },
  },
  {
    timestamps: false,
  }
);
module.exports = Profiles;
