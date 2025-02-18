import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const authToken = localStorage.getItem('authToken');
if (authToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}
