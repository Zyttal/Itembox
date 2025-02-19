import { ref } from 'vue';
import type { Item, ItemCreate, PaginatedResponse } from '@/types/items';
import { addItem, getItemDetails, getItems } from '@/services/ItemService';
import LoadingService from '@/services/LoadingService';
import SnackbarService from '@/services/SnackBarService';

export function useItems() {
  const items = ref<Item[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const pagination = ref<Omit<PaginatedResponse<Item>, 'data'> | null>(null);
  const currentUserId = ref<number | null>(null);
  const currentPage = ref(1);

  const fetchItems = async (page?: number, userId?: number) => {
    try {
      loading.value = true;

      if (userId) {
        currentUserId.value = userId;
      }
      if (page) {
        currentPage.value = page;
      }

      const response = await getItems(currentUserId.value || undefined, currentPage.value);
      items.value = response.data;

      const { data, ...paginationInfo } = response;
      pagination.value = paginationInfo;
    } catch (err) {
      error.value = 'Failed to load items';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const handleViewItem = async (itemId: number): Promise<Item> => {
    try {
      LoadingService.start();
      console.log(`Triggered with id: ${itemId}`);

      const response = await getItemDetails(itemId);
      return response;
    } catch {
      SnackbarService.error("Failed to get Item Details");
      throw error;
    } finally {
      LoadingService.stop();
    }
  }

  const handleAddItem = async (item: ItemCreate) => {
    try {
      LoadingService.start();

      const response = await addItem(item);
      console.log(`${response.data}`);
      SnackbarService.success('Added an Item!')
      return response.data;
    } catch {
      SnackbarService.error('Failed to add an item!');
    } finally {
      LoadingService.stop();
    }
  };

  const handleEditItem = (itemId: number) => {
    // TODO: Implement edit functionality
    console.log('Edit item:', itemId);
  };

  const handleDeleteItem = (itemId: number) => {
    // TODO: Implement delete functionality
    console.log('Delete item:', itemId);
  };

  return {
    items,
    loading,
    error,
    pagination,
    fetchItems,
    handleViewItem,
    handleAddItem,
    handleEditItem,
    handleDeleteItem
  };
}
