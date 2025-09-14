import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; // { success, token, user }
};

export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data; // { success, token, user }
};

export const logout = () => {
  localStorage.removeItem('token');
};