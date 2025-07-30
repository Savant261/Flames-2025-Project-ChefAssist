import axios from "axios";

// Create a custom Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 60000, // Increased to 60 seconds for AI recipe generation
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default instance;
