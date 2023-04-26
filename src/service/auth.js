import http from "@/http-common";
import md5 from "md5";

export const login = (data) => {
  data = Object.assign({}, data);
  if (!data.email || !data.password)
    throw { message: "Email e senha são obrigatórios" };
  data.password = md5(data.password);

  return http
    .post("/api/v1.0/user/login", data)
    .then((r) => r.data)
    .catch((e) => {
      throw e.response.data || e;
    });
};

export const register = (data) => {
  data = Object.assign({}, data);
  data.password = md5(data.password);

  return http
    .post("/api/v1.0/user/register", data)
    .then((r) => r.data)
    .catch((e) => {
      throw e.response.data || e;
    });
};

export const renewToken = () => {
  return http
    .post("/api/v1.0/user/renew-token")
    .then((r) => r.data)
    .catch((e) => {
      throw e.response.data || e;
    });
};

export const verifyToken = (token) => {
  if (!token) throw { message: "Token " };

  return http
    .get("/auth/reset-password/validate-token", { params: { token } })
    .then((r) => r.data)
    .catch((e) => {
      throw e.response.data || e;
    });
};
