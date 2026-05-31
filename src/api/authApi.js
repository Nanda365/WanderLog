import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  const response = await authApi.post('/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await authApi.post('/register', userData);
  return response.data;
};
