const BasketService = require("../services/basket-service");

class BasketController {
  async insertBasket(req, res, next) {
    try {
      const newRecord = await BasketService.addToBasket(req.body);
      res.json(newRecord);
    } catch (err) {
      next(err);
    }
  }

  async selectBasket(req, res, next) {
    try {
      const { id } = req.params;
      const basket = await BasketService.getBasket(id);
      res.json(basket);
    } catch (err) {
      next(err);
    }
  }

  async deleteBasket(req, res, next) {
    try {
      await BasketService.removeFromBasket(req.body);
      res.json({ message: "Товар удален из корзины" });
    } catch (err) {
      next(err);
    }
  }

  async decreaseBasket(req, res, next) {
    try {
      await BasketService.decreaseItemCount(req.body);
      res.json({ message: "Успешное уменьшение количества товара в корзине" });
    } catch (err) {
      next(err);
    }
  }

  async clearBasket(req, res, next) {
    try {
      await BasketService.clearBasket(req.params.id_user);
      res.json({ message: "Корзина очищена" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BasketController();
