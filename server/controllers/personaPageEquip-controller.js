const PersonaPageEquipService = require("../services/personaPageEquip-service");

class PersonaPageEquipController {
  async getEquipmentsById(req, res, next) {
    try {
      const { id } = req.params;
      const equipment = await PersonaPageEquipService.getEquipmentsById(id);
      res.json(equipment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PersonaPageEquipController();
