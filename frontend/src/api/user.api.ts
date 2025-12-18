import api from "./axios";

export const getMe = async () => {
  console.log("getMe called - making request to /auth/me");
  try {
    const response = await api.get("/auth/me");
    console.log("getMe success:", response.data);
    return response.data;
  } catch (error) {
    console.error("getMe failed:", error);
    throw error;
  }
};
