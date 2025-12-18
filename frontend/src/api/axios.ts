import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  withCredentials: true,
  timeout: 5000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      fullError: error,
    });
    return Promise.reject(error);
  }
);

export default api;
