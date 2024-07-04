import $api from "./http.service";

const registerEndpoint = "/registration";

const registerService = {
  registration: async (login, password) => {
    const { data } = await $api.post(registerEndpoint, {
      login,
      password,
    });
    return data;
  },
};

export default registerService;
