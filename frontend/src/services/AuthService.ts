import type { UserRegistrationData } from "@/types/UserRegistrationData";
import { api } from "./api";
import type { User } from "@/types/user";

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.warn('No auth token found');
      return null;
    }

    const response = await api.get('/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 200) {
      return response.data || { success: true };
    }

    return null;
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};


export const register = async (userData: UserRegistrationData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Registration failed:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw error;
    }
  }
};

export const login = async (credentials: { email: string, password: string }) => {
  try {
    const response = await api.post('/login', credentials);

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.log('Token stored:', response.data.token);
      return response.data.user;
    } else {
      throw new Error('Login failed: No token received')
    }
  } catch (error: any) {
    console.error('Login failed:', error);

    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed')
    } else if (error.request) {
      throw new Error('No response received from server')
    } else {
      throw new Error('Error during login attempt')
    }
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');

    // Remove the token from localStorage
    localStorage.removeItem('authToken');

    // Remove Authorization header from axios
    delete api.defaults.headers.common['Authorization'];

    return true;
  } catch (error: any) {
    console.error('Logout failed:', error);
    return false;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error:any){
    console.error('User retrieval failed:', error.response.data);
    throw new Error(`Error on request: ${error.message}`);
  }
}

