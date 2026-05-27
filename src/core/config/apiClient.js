import axios from 'axios';
import { ENV } from './env';
import { getAccessToken, getRefreshToken, storeTokens, clearAuthData } from '../../shared/utils/tokenStorage';

const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Network error (no response from server)
    if (!error.response) {
      const networkError = new Error('Network error. Please check your internet connection or try again later.');
      networkError.status = 0;
      networkError.errCode = 'NETWORK_ERROR';
      return Promise.reject(networkError);
    }
    
    const status = error.response?.status;
    const backendErrors = error.response?.data?.errors;
    const errCode = backendErrors?.[0]?.errCode;
    
    let message = 'Something went wrong';
    
    if (backendErrors && Array.isArray(backendErrors) && backendErrors.length > 0) {
      const errorMessages = backendErrors.map(e => e.details || e.message).filter(Boolean);
      if (errorMessages.length > 0) {
        message = errorMessages.join(', ');
      }
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    
    if (status === 401 && !error.config._retry) {
      error.config._retry = true;
      
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${ENV.API_BASE_URL}/ums/v1/auth/refresh`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );
          
          const newAccessToken = response.data?.accessToken;
          const newRefreshToken = response.data?.refreshToken;
          
          if (newAccessToken) {
            storeTokens(newAccessToken, newRefreshToken || refreshToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(error.config);
          }
        } catch (refreshError) {
          clearAuthData();
          window.location.href = '/register';
          return Promise.reject(refreshError);
        }
      } else {
        clearAuthData();
        window.location.href = '/register';
      }
    }
    
    const err = new Error(message);
    err.status = status;
    err.errCode = errCode;
    err.response = error.response;
    return Promise.reject(err);
  }
);

export default apiClient;
