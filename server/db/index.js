const { establishForeignKeys, Equipments, Profiles } = require("../models");
const sequelize = require("./connect-db");
const { equipments, profile } = require("./seed");

const bcrypt = require("bcrypt");

async function autoInsert(model, seed) {
  const count = await model.count();
  if (count === 0) {
    await model.bulkCreate(seed);
    console.log("\x1b[32m%s\x1b[0m", `✅ Данные добавлены в ${model.name}!`);
  }
}

module.exports = async function initializeData() {
  try {
    establishForeignKeys();
    const existingTables = await sequelize.getQueryInterface().showAllTables();
    if (existingTables.length === 0) {
      await sequelize.sync({ force: false });
      console.log("\x1b[37m✅ База данных и таблицы созданы!\x1b[0m");
    } else {
      await sequelize.sync({ force: false });
    }
    autoInsert(Equipments, equipments);
    autoInsert(Profiles, profile);
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "❌ Что-то пошло не так при инициализации данных:\n",
      error
    );
  }
};
