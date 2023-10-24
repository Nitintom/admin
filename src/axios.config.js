import axios from "axios";

// Define the base URL for your API
const baseURL = "https://askvital.onrender.com/";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL,
});

// Add request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Add your logic to include the JWT token
    const JWT_SECRET = localStorage.getItem("JWT_SECRET");
    if (JWT_SECRET) {
      config.headers.Authorization = `Bearer ${JWT_SECRET}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
