import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API, // Set your base URL here
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here before sending it
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here before resolving it
    return response;
  },
  (error) => {
    // Handle response error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
