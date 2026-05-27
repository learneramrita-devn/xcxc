import apiClient from '../../../../core/config/apiClient';

const ENDPOINTS = {
  TENANT_CHECK: '/ums/v1/tenant/tenant-check',
  USER_CHECK: '/ums/v1/users/user-check',
  REGISTER_USER: '/ums/v1/users/register',
  REGISTER_TENANT: '/ums/v1/tenant/register',
  LOGIN: '/ums/v1/auth/login',
  TENANT_LOGIN: '/ums/v1/tenant/login',
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

export const tenantLoginApi = (payload) =>
  apiClient.post(ENDPOINTS.TENANT_LOGIN, payload);

export const registerUserApi = (payload) =>
  apiClient.post(ENDPOINTS.REGISTER_USER, payload);

export const registerTenantApi = (payload) =>
  apiClient.post(ENDPOINTS.REGISTER_TENANT, payload);

export const updateEmailApi = (payload) =>
  apiClient.post(ENDPOINTS.UPDATE_EMAIL, payload);

export const updatePasswordApi = (payload) =>
  apiClient.put(ENDPOINTS.UPDATE_PASSWORD, payload);

export const userForgotPasswordApi = (payload) =>
  apiClient.post(ENDPOINTS.USER_FORGOT_PASSWORD, payload);

export const tenantForgotPasswordApi = (payload) =>
  apiClient.post(ENDPOINTS.TENANT_FORGOT_PASSWORD, payload);

export const tenantPasswordApi = (payload) =>
  apiClient.post(ENDPOINTS.TENANT_PASSWORD, payload);
