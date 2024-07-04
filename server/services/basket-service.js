const ApiError = require("../exceptions/api-error");
const { Basket, Equipments } = require("../models");
const sequelize = require("sequelize");
class BasketService {
  async getBasket(id_user) {
    if (!id_user) {
      throw ApiError.BadRequest("Не указан id пользователя");
    }
    const basket = await Basket.findAll({
      where: { id_user },
      include: [
        {
          model: Equipments,
          as: "equipment",
          attributes: [
            "type_equip",
            "price",
            "pathimg",
            [sequelize.literal(`"equipment"."main_info"->>'Бренд'`), "brand"],
            [sequelize.literal(`"equipment"."main_info"->>'Модель'`), "model"],
          ],
        },
      ],
    });

    return basket;
  }
  async addToBasket({ id_equipment, id_user, count }) {
    if (!id_equipment || !id_user || !count) {
      throw ApiError.BadRequest(
        `Не все параметры ${
          ("1" + id_equipment, "2" + id_user, "3" + count)
        } указаны`
      );
    }

    const record = await Basket.findOne({ where: { id_equipment, id_user } });

    if (record) {
      record.count += count;
      return record.save();
    } else {
      return Basket.create({ id_equipment, id_user, count });
    }
  }
  async removeFromBasket({ id_equipment, id_user }) {
    if (!id_equipment || !id_user) {
      throw ApiError.BadRequest(
        `Не все параметры ${
          ("id_equipment", id_equipment, "id_user", id_user)
        } указаны`
      );
    }
    return Basket.destroy({ where: { id_equipment, id_user } });
  }

  async decreaseItemCount({ id_equipment, id_user }) {
    if (!id_equipment || !id_user) {
      throw ApiError.BadRequest(
        `Не все параметры ${
          ("id_equipment", id_equipment, "id_user", id_user)
        } указаны`
      );
    }

    const record = await Basket.findOne({ where: { id_equipment, id_user } });

    if (record) {
      record.count = record.count > 1 ? record.count - 1 : 1;

      if (record.count === 0) {
        return record.destroy();
      } else {
        return record.save();
      }
    } else {
      throw ApiError.BadRequest("Товар в корзине не найден");
    }
  }

  async clearBasket(id_user) {
    if (!id_user) {
      throw ApiError.BadRequest("Не указан id пользователя");
    }

    return Basket.destroy({ where: { id_user } });
  }
}

module.exports = new BasketService();
