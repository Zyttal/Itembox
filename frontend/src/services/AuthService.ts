import type { UserRegistrationData } from "@/types/UserRegistrationData";
import { initializeApi } from "./api";
import { api } from "./api";

export const register = async (userData: UserRegistrationData) => {
  await initializeApi();
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
