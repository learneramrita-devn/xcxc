import apiClient from '../../../core/config/apiClient';

// User Forgot Password APIs
export const userForgotPasswordApi = (email) => 
  apiClient.post('/ums/v1/users/forgot-password', { email });

export const userUpdatePasswordApi = (payload) => 
  apiClient.put('/ums/v1/users/update/password', payload);

// Tenant Forgot Password APIs
export const tenantForgotPasswordApi = (email) => 
  apiClient.post('/ums/v1/tenant/forgot-password', { email });

export const tenantUpdatePasswordApi = (payload) => 
  apiClient.put('/ums/v1/tenant/password', payload);

// Verify Reset Token
export const verifyResetTokenApi = (token) => 
  apiClient.post('/ums/v1/users/verify-reset-token', { token });
