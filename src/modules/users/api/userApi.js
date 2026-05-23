import apiClient from '../../../core/config/apiClient';

export const getProfileApi             = (userId) => apiClient.post('/ums/v1/users/list', { userIdList: [userId] });
export const updateProfileInfoApi      = (userId, userProfileInfo) => apiClient.post('/ums/v1/users/update/profile-info', { userId, userProfileInfo });
export const updateAddressInfoApi      = (userId, addressInfo) => apiClient.post('/ums/v1/users/update/address-info', { userId, addressInfo });
export const updateBusinessInfoApi     = (userId, businessInfo) => apiClient.post('/ums/v1/users/update/business-info', { userId, businessInfo });
export const updateIdentityInfoApi     = (userId, identityDocuments) => apiClient.post('/ums/v1/users/update/identity-info', { userId, identityDocuments });
export const updateKycInfoApi          = (userId, kycInfo) => apiClient.post('/ums/v1/users/update/kyc-info', { userId, kycInfo });
export const updateSecurityInfoApi     = (userId, securityInfo) => apiClient.post('/ums/v1/users/update/security-info', { userId, securityInfo });
export const updateAdditionalInfoApi   = (userId, userAdditionalInfo) => apiClient.post('/ums/v1/users/update/user-additional-info', { userId, userAdditionalInfo });
