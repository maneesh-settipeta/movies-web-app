import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_baseURL, // Use your base URL from .env
    timeout: 10000, // Optional: Set a timeout for requests
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add Authorization token or other headers if needed
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer tokemmm`;
        }
        console.log("I am trhough interceptro", config);

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle errors (e.g., unauthorized, server errors)
        if (error.response?.status === 401) {
            // Redirect to login if unauthorized
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;