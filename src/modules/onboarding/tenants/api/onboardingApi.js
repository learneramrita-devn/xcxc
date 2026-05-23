import apiClient from '../../../../core/config/apiClient';

const ENDPOINTS = {
  TENANT_CHECK: '/ums/v1/tenant/tenant-check',
  USER_CHECK: '/ums/v1/users/user-check',
  REGISTER: '/ums/v1/users/register',
  LOGIN: '/ums/v1/auth/login',
  UPDATE_EMAIL: '/ums/v1/users/update/email',
  UPDATE_PASSWORD: '/ums/v1/users/update/password',
  USER_FORGOT_PASSWORD: '/ums/v1/users/forgot-password',
  TENANT_FORGOT_PASSWORD: '/ums/v1/tenant/forgot-password',
  TENANT_PASSWORD: '/ums/v1/tenant/password',
};

export const tenantCheckApi = (mobile) =>
  apiClient.post(ENDPOINTS.TENANT_CHECK, { mobileIn: [mobile] });

export const userCheckApi = (mobile) =>
  apiClient.post(ENDPOINTS.USER_CHECK, { mobileIn: [mobile] });

export const loginApi = (payload) =>
  apiClient.post(ENDPOINTS.LOGIN, payload);

export const registerUserApi = (payload) => {
  console.log('Register Payload:', JSON.stringify(payload, null, 2));
  return apiClient.post(ENDPOINTS.REGISTER, payload);
};

export const updateEmailApi = (payload) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return apiClient.put(ENDPOINTS.UPDATE_EMAIL, payload);
  }
  return apiClient.put(ENDPOINTS.UPDATE_EMAIL, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updatePasswordApi = (payload) =>
  apiClient.put(ENDPOINTS.UPDATE_PASSWORD, payload);

export const userForgotPasswordApi = (payload) =>
  apiClient.post(ENDPOINTS.USER_FORGOT_PASSWORD, payload);

export const tenantForgotPasswordApi = (payload) =>
  apiClient.post(ENDPOINTS.TENANT_FORGOT_PASSWORD, payload);

export const tenantPasswordApi = (payload) =>
  apiClient.post(ENDPOINTS.TENANT_PASSWORD, payload);
