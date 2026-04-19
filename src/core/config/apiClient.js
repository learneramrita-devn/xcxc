import axios from 'axios';
import { ENV } from './env';

const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.errors?.[0]?.details || error.response?.data?.errors?.[0]?.message || error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', { status, data: error.response?.data, url: error.config?.url });
    const err = new Error(message);
    err.status = status;
    return Promise.reject(err);
  }
);

export default apiClient;
