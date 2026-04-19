import apiClient from '../../../../core/config/apiClient';

const ENDPOINTS = {
  USER_CHECK: '/ums/v1/users/user-check',
  REGISTER: '/ums/v1/users/register',
  LOGIN: '/ums/v1/auth/login',
};

export const userCheckApi = (mobile) =>
  apiClient.post(ENDPOINTS.USER_CHECK, { mobileIn: [mobile] });

export const loginApi = (payload) =>
  apiClient.post(ENDPOINTS.LOGIN, payload);

export const registerUserApi = (payload) => {
  console.log('Register Payload:', JSON.stringify(payload, null, 2));
  return apiClient.post(ENDPOINTS.REGISTER, payload);
};
