import apiClient from '../../../../core/config/apiClient';

const ENDPOINTS = {
  USER_CHECK: '/ums/v1/users/user-check',
  REGISTER: '/ums/v1/users/register',
};

export const userCheckApi = (mobile) =>
  apiClient.get(ENDPOINTS.USER_CHECK, { params: { mobileIn: mobile } });

export const registerUserApi = (payload) => {
  console.log('Register Payload:', JSON.stringify(payload, null, 2));
  return apiClient.post(ENDPOINTS.REGISTER, payload);
};
