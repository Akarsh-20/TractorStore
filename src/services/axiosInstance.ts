import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('tractor_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// check for 401 on responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // clear session and go to login
      localStorage.removeItem('tractor_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
