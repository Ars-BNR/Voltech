import $api from "./http.service";

const basketPostEndpoint = "/insertbasket";
const basketGetEndpoint = "/selctbasket";
const basketDecreaseEndpoint = "/decreasebasket";
const basketDeleteEndpoint = "/deletebasket";
const basketClearEndpoint = "/clearbasket";

const basketService = {
  post: async (basket) => {
    const { data } = await $api.post(basketPostEndpoint, basket);
    return data;
  },
  get: async (id) => {
    const { data } = await $api.get(`${basketGetEndpoint}/${id}`);
    return data;
  },
  decreasebasket: async (basket) => {
    const { data } = await $api.patch(basketDecreaseEndpoint, basket);
    return data;
  },
  deletebasket: async (basket) => {
    const { data } = await $api.delete(basketDeleteEndpoint, {
      data: basket,
    });
    return data;
  },
  clearbasket: async (id) => {
    const { data } = await $api.delete(`${basketClearEndpoint}/${id}`);
    return data;
  },
};

export default basketService;
