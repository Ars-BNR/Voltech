const CatalogService = require("../services/catalog-service");
const path = require("path");

class CatalogController {
  async allitems(req, res, next) {
    try {
      const equipments = await CatalogService.getAllEquipments(req.query);
      res.json(equipments);
    } catch (err) {
      next(err);
    }
  }

  getImg(req, res, next) {
    try {
      const imageName = req.params.img;
      const imagePath = path.join(__dirname, "..", "img", `${imageName}.png`);
      res.sendFile(imagePath);
    } catch (err) {
      next(err);
    }
  }

  async createItem(req, res, next) {
    try {
      const newEquipment = await CatalogService.createItem(
        req.body,
        req.files.pathimg
      );
      res.json(newEquipment);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CatalogController();
