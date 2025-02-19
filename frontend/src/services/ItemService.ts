import { api } from "./api"

export const getItems = async (userId?: number) => {
  try {
    const params = userId ? { user_id: userId } : {};
    const response = await api.get('/items', { params });
    return response.data;
  } catch (error: any) {
    console.error('Items retrieval failed:', error.response.data);
    throw new Error('Error on request:', error.message);
  }
}
