<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue';
import { useItems } from '@/composables/useItems';
import router from '@/router';
import { getUser } from '@/services/AuthService';
import type { User } from '@/types/user';
import { onMounted, ref } from 'vue';

const currentUser = ref<User | null>(null);

const {
  items,
  loading,
  error,
  pagination,
  fetchItems,
  handleViewItem,
  handleAddItem,
  handleEditItem,
  handleDeleteItem
} = useItems();

onMounted(async () => {
  try {
    // Get User then fetch Items with the userId
    currentUser.value = await getUser();
    if (currentUser.value) {
      fetchItems(1, currentUser.value.id);
    }
  } catch (err) {
    console.error('Error initializing items:', err);
  }
});

const handlePageChange = (page: number) => {
  if (currentUser.value) {
    fetchItems(page);
  }
};

const refreshRoute = () => {
  router.go(0);
};
</script>

<template>
  <DashboardHeader />

  <!-- Items Table -->
  <div class="table-container">
    <!-- Table head -->
    <div class="table-header">
      <h3 class="title">Items</h3>
      <button @click="handleAddItem">+ Add Item</button>
    </div>

    <table v-if="!loading && !error">
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>
            <div class="item-name">
              <span class="item-name">{{ item.title }}</span>
            </div>
          </td>
          <td>
            <div class="item-description">
              <span class="item-details">{{ item.item_description }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <p>Loading items...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="refreshRoute">Try Again</button>
    </div>

    <!-- Pagination Controls -->
    <div v-if="pagination && !loading && !error" class="pagination-controls">
      <div class="pagination-info">
        <span>Showing items {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }}</span>
      </div>
      <div class="pagination-buttons">
        <button class="pagination-button" :disabled="!pagination.prev_page_url"
          @click="handlePageChange(pagination.current_page - 1)">
          &laquo; Previous
        </button>

        <button v-for="link in pagination.links.slice(1, -1)" :key="link.label" class="pagination-button"
          :class="{ active: link.active }" @click="handlePageChange(Number(link.label))">
          {{ link.label }}
        </button>

        <button class="pagination-button" :disabled="!pagination.next_page_url"
          @click="handlePageChange(pagination.current_page + 1)">
          Next &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-text);
}

.error-state button {
  margin-top: 1rem;
}

.item-details {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-edit,
.btn-delete {
  padding: 0.4em 0.8em;
  font-size: 0.9em;
}

.btn-edit {
  margin-right: 0.5rem;
}

.btn-delete {
  background-color: var(--color-background-mute);
}

.dashboard {
  padding: 20px;
}
</style>
