import axios from 'axios';

// base axios instance for all api calls
const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('tractor_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// if server returns 401, clear session and send to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tractor_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
