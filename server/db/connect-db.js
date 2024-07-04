const Sequalize = require("sequelize");

const sequelize = new Sequalize({
  database: "VOLTECH",
  username: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  define: {
    timestamps: false,
  },
  logging: false,
});
module.exports = sequelize;
