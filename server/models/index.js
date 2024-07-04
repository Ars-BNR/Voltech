const Profiles = require("./profiles-model");
const Token = require("./token-model");
const Orders = require("./orders-model");
const Equipments = require("./equipments-model");
const Basket = require("./basket-model");

const establishForeignKeys = () => {
  Profiles.hasOne(Token, { foreignKey: "user" });
  Token.belongsTo(Profiles, { foreignKey: "user" });

  Profiles.hasMany(Orders, { foreignKey: "id_user" });
  Orders.belongsTo(Profiles, { foreignKey: "id_user" });

  Profiles.hasMany(Basket, { foreignKey: "id_user" });
  Basket.belongsTo(Profiles, { foreignKey: "id_user" });

  Equipments.hasMany(Basket, { foreignKey: "id_equipment" });
  Basket.belongsTo(Equipments, { foreignKey: "id_equipment" });
};

module.exports = {
  Profiles,
  Token,
  Orders,
  Equipments,
  Basket,
  establishForeignKeys,
};
