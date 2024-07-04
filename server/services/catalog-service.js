const { Equipments } = require("../models");
const fileService = require("./File-service.js");
const { Op } = require("sequelize");
class CatalogService {
  async getAllEquipments(query) {
    let where = {};

    if (query.category) {
      where.type_equip = query.category;
    }

    if (query.price) {
      if (query.price.includes("-")) {
        const [minPrice, maxPrice] = query.price.split("-").map(Number);
        where.price = {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        };
      } else {
        where.price = Number(query.price);
      }
    }

    if (query.brand) {
      const brands = query.brand.split(",");
      where["main_info"] = {
        Бренд: {
          [Op.in]: brands,
        },
      };
    }

    const equipments = await Equipments.findAll({ where });

    return equipments;
  }

  async createItem(equipment, pathimg) {
    console.log("equipment", equipment);
    const fileName = await fileService.saveFile(pathimg);
    let { type_equip, price, short_info, main_info, description } = equipment;
    short_info = JSON.parse(short_info);
    main_info = JSON.parse(main_info);
    description = JSON.parse(description);
    const createdEquip = await Equipments.create({
      type_equip,
      price,
      short_info,
      main_info,
      description,
      pathimg: fileName,
    });
    return createdEquip;
  }
}

module.exports = new CatalogService();
