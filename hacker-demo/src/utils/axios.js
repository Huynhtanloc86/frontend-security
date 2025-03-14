import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm cấu hình để gửi cookies
axiosInstance.defaults.withCredentials = true;

// Thêm interceptor để xử lý token
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
