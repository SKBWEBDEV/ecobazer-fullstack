import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL:", api.defaults.baseURL);

// Attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecobazer_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "REQUEST:",
      config.method?.toUpperCase(),
      config.baseURL + config.url,
    );

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// Handle unauthorized
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.log("API ERROR:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("ecobazer_token");
      localStorage.removeItem("ecobazer_user");

      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
