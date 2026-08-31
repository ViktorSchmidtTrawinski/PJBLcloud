import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7071/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@FoodDelivery:token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling (e.g., auto logout on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // localStorage.removeItem("@FoodDelivery:token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
