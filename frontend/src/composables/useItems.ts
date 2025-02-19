import { ref } from 'vue';
import type { Item, PaginatedResponse } from '@/types/items';
import { getItems } from '@/services/ItemService';

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
  const handleViewItem = () => {
    // TODO: Implement view item functionality
    console.log('View item clicked');
  }

  const handleAddItem = () => {
    // TODO: Implement add item functionality
    console.log('Add item clicked');
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
