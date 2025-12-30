import api from './api';

// Get user profile
export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update profile
export const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await api.put('/users/password', passwordData);
  return response.data;
};
