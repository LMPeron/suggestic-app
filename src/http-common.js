import axios from "axios";
const VUE_APP_HOST_HTTP = process.env.VUE_APP_HOST_HTTP;
import useUserStore from "./stores/user";

const http = axios.create({
  baseURL: VUE_APP_HOST_HTTP,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const user = useUserStore();
    const token = user.token;
    if (token && token !== "false") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
