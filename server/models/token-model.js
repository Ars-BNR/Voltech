const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect-db");

const Token = sequelize.define(
  "Token",
  {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Token;
