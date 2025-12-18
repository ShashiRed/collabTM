import api from "./axios";

export const login = (data: any) =>
  api.post("/auth/login", data).then((res) => res.data);

export const register = (data: any) =>
  api.post("/auth/register", data).then((res) => res.data);

export const logout = () =>
  api.post("/auth/logout").then((res) => res.data);
