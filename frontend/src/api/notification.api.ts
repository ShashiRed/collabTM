import api from "./axios";

export const fetchNotifications = () =>
  api.get("/notifications").then((res) => res.data);
