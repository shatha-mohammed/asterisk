import axios from "axios";

// Authorization Callback Injection
let onUnauthorized = null;
export const setOnUnauthorized = (cb) => {
  onUnauthorized = cb;
};

// Axios Instance Configuration
const api = axios.create({
  baseURL: "https://asterisk-backend-drab.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Automatically attach the stored JWT token to every outgoing request
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

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Unwrap the Axios response to return only the actual data payload
    return response.data;
  },
  (error) => {
    const errorData = error.response?.data;

    // Handle session expiration globally
    if (error.response?.status === 401) {
      // Clear stale authentication data
      localStorage.removeItem("Asterisk_token");
      localStorage.removeItem("Asterisk_user");

      // Trigger the injected callback to securely navigate the user
      if (onUnauthorized) onUnauthorized();
    }

    // Standardize error messages to be consumed by the UI components safely
    const errorMessage =
      errorData?.message ||
      "An unexpected error occurred, please try again later!";

    return Promise.reject(new Error(errorMessage));
  },
);

export default api;
