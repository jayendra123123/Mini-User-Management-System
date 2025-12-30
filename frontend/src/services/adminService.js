import api from './api';

// Get all users with pagination and filters
export const getAllUsers = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/admin/users?${queryString}`);
  return response.data;
};

// Get single user
export const getUser = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

// Activate user
export const activateUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/activate`);
  return response.data;
};

// Deactivate user
export const deactivateUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/deactivate`);
  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

// Get statistics
export const getStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data.stats;
};
