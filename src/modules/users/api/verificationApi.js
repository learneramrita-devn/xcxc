import apiClient from '../../../core/config/apiClient';

export const sendVerificationEmailApi = (email) => 
  apiClient.post('/ums/v1/users/send-verification-email', { email });

export const verifyEmailTokenApi = (token) => 
  apiClient.post('/ums/v1/users/verify-email-token', { token });

export const sendOtpApi = (mobileNumber) => 
  apiClient.post('/ums/v1/users/send-otp', { mobileNumber });

export const verifyOtpApi = (mobileNumber, otp) => 
  apiClient.post('/ums/v1/users/verify-otp', { mobileNumber, otp });

export const activateUserApi = (userId) => 
  apiClient.post('/ums/v1/users/activate', { userId });
