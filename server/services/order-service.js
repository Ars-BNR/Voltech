const ApiError = require("../exceptions/api-error");
const { Orders } = require("../models");
const orderid = require("order-id")("key");

class OrderService {
  async insertOrders(order) {
    function getCurrentDate() {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    }
    let { name, surname, number, address, id_user, price, allCount, info } =
      order;

    id_user = +id_user;
    const status = "Обработка";
    const id_order = orderid.generate();
    const date = getCurrentDate();

    const newOrder = await Orders.create({
      name,
      surname,
      number,
      address,
      id_order,
      id_user,
      date,
      price,
      allCount,
      status,
      info,
    });
    return newOrder;
  }

  async getByUserId(id) {
    if (!id) {
      throw ApiError.BadRequest("Не указан id пользователя");
    }

    return await Orders.findAll({ where: { id_user: id } });
  }

  async getAll() {
    return await Orders.findAll();
  }

  async updateStatus(id_order, status) {
    if (!id_order) {
      throw ApiError.BadRequest("Не указан id заказа");
    }

    const order = await Orders.findOne({ where: { id_order: id_order } });
    if (order) {
      order.status = status;
      return await order.save();
    } else {
      throw ApiError.BadRequest("Заказ не найден");
    }
  }
  async CancelStatusUser(id_order) {
    if (!id_order) {
      throw ApiError.BadRequest("Не указан id заказа");
    }
    const order = await Orders.findOne({ where: { id_order: id_order } });
    const newStatus = "Отменен пользователем";
    if (order) {
      order.status = newStatus;
      return await order.save();
    } else {
      throw ApiError.BadRequest("Заказ не найден");
    }
  }

  async delete(id_order) {
    if (!id_order) {
      throw ApiError.BadRequest("Не указан id заказа");
    }

    const order = await Orders.findOne({ where: { id_order: id_order } });

    if (order) {
      await order.destroy();
      return { message: "Заказ удалён" };
    } else {
      throw ApiError.BadRequest("Заказ не найден");
    }
  }

  async getById(id) {
    if (!id) {
      throw ApiError.BadRequest("Не указан id заказа");
    }

    const order = await Orders.findOne({ where: { id_order: id } });
    if (!order) throw new Error("Заказ не найден");
    return order;
  }
}

module.exports = new OrderService();
