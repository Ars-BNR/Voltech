const ApiError = require("../exceptions/api-error");
const { Equipments } = require("../models");

class PersonaPageEquipService {
  async getEquipmentsById(id) {
    if (!id) {
      throw ApiError.BadRequest("не указан Id");
    }
    const equipment = await Equipments.findByPk(id);
    return equipment;
  }
}

module.exports = new PersonaPageEquipService();
