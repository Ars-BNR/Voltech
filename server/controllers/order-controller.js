const OrderService = require("../services/order-service");

class OrdersController {
  async insertOrders(req, res, next) {
    try {
      const order = await OrderService.insertOrders(req.body);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }

  async selectOrders(req, res, next) {
    try {
      const { id } = req.params;
      const orders = await OrderService.getByUserId(id);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async selectAllOrders(req, res, next) {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async changeStatusOrder(req, res, next) {
    try {
      const order = await OrderService.updateStatus(
        req.body.id_order,
        req.body.newStatus
      );
      res.json({
        message: "Статус заказа обновлен",
        updatedOrder: order,
      });
    } catch (err) {
      next(err);
    }
  }
  async CancelStatusUser(req, res, next) {
    try {
      const { id_order } = req.params;
      const order = await OrderService.CancelStatusUser(id_order);
      res.json({
        message: "Заказ отменен пользователем",
        newStatusOrder: order,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { id_order } = req.params;
      const message = await OrderService.delete(id_order);
      res.json(message);
    } catch (err) {
      next(err);
    }
  }

  async selectOrderById(req, res, next) {
    try {
      const { id_order } = req.params;
      const order = await OrderService.getById(id_order);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrdersController();
