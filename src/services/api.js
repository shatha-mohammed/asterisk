import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Asterisk_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorData = error.response?.data;

    if (error.response?.status === 401) {
      localStorage.removeItem("Asterisk_token");
      window.location.href = "/login";
    }

    const errorMessage =
      errorData?.message ||
      "An unexpected error occurred, please try again later!";

    return Promise.reject(new Error(errorMessage));
  },
);

export default api;
