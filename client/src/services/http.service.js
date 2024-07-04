import axios from "axios";
import refreshService from "./refresh.service";

export const API_URL = `http://localhost:9375/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const orifinalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      orifinalRequest._isRetry = true;
      try {
        const response = await refreshService.refresh();
        localStorage.setItem("token", response.accessToken);
        return $api.request(orifinalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

export default $api;

// axios.defaults.baseURL = "http://localhost:9375/api/";

// axios.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem(
//     "accessToken"
//   )}`;
//   return config;
// });
// export const API_URL = "http://localhost:9375/api";
// const cookieService = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });
// cookieService.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem(
//     "accessToken"
//   )}`;
//   return config;
// });
// cookieService.interceptors.response.use(
//   function (response) {
//     // Если все хорошо, просто возвращаем ответ
//     return response;
//   },
//   function (error) {
//     console.log(error);
//     // Если сервер вернул ошибку 401, делаем редирект на страницу входа
//     // if (error.response && error.response.status === 401) {
//     //   window.location.href = '/login'; // Или используйте свой механизм роутинга
//     // }
//     return Promise.reject(error);
//   }
// );
// const httpService = {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
//   patch: axios.patch,
//   put: axios.put,
// };
// export default httpService;
