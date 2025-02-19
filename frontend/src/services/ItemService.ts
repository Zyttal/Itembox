import type { Item, ItemCreate } from "@/types/items";
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

export const getItemDetails = async (itemId: number): Promise<Item> => {
  try {
    const response = await api.get(`/items/${itemId}`);
    console.log(`Response from api:`, JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error: any) {
    console.error("Item retrieval failed:", error.response.data);
    throw new Error(`Error on request: ${error.message}`);
  }
}

export const addItem = async (item:ItemCreate) => {
  try {

    const response = await api.post('/items', item);
    return response.data;
  } catch (error: any) {
    console.error('Items retrieval failed:', error.response.data);
    throw new Error(`Error on request: ${error.message}`);
  }
}
