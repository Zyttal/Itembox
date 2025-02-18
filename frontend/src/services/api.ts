import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export const initializeApi = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
    return true;
  } catch (error) {
    console.error('Failed to get CSRF cookie', error);
    return false;
  }
};
