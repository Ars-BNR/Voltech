import $api from "./http.service";

const catalogEndpoint = "/allitems";
const catalogInfoEquipmentpoint = "/equipment";

const catalogService = {
  get: async (queryParams) => {
    const { data } = await $api.get(catalogEndpoint, {
      params: queryParams,
    });
    return data;
  },
  getInfoEquipment: async (id) => {
    const { data } = await $api.get(`${catalogInfoEquipmentpoint}/${id}`);
    return data;
  },
};

export default catalogService;
