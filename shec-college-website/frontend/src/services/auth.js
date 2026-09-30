import { apiRequest } from './api';

export const loginUser = async (payload) => apiRequest('/auth/login', {
  method: 'POST',
  body: payload
});

export const registerUser = async (payload) => apiRequest('/auth/register', {
  method: 'POST',
  body: payload
});
