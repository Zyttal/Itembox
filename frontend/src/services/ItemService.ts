import { api } from "./api"

export const getItems = async (userId?: number, page: number = 1) => {
  try {
    const params = {
      ...(userId ? { user_id: userId } : {}),
      page
    };
    const response = await api.get('/items', { params });
    return response.data;
  } catch (error: any) {
    console.error('Items retrieval failed:', error.response.data);
    throw new Error(`Error on request: ${error.message}`);
  }
}
