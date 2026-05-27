import apiClient from '../../../core/config/apiClient';

// Sub Users APIs
export const getSubUsersApi = (tenantId) => 
  apiClient.post('/ums/v1/users/list', { tenantIdList: [tenantId] });

export const createSubUserApi = (payload) => 
  apiClient.post('/ums/v1/users/register', payload);

export const updateSubUserApi = (userId, payload) => 
  apiClient.put(`/ums/v1/users/update/${userId}`, payload);

export const deleteSubUserApi = (userId) => 
  apiClient.delete(`/ums/v1/users/delete/${userId}`);

export const getSubUserByIdApi = (userId) => 
  apiClient.get(`/ums/v1/users/${userId}`);
