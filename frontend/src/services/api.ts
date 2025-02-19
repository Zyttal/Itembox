import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const authToken = localStorage.getItem('authToken');
if (authToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}
