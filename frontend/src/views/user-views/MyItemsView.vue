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
  fetchItems,
  handleAddItem,
  handleEditItem,
  handleDeleteItem
} = useItems();

onMounted(async () => {
  try {
    currentUser.value = await getUser();
    await fetchItems(currentUser.value.id);
  } catch (err) {
    console.error('Error initializing view:', err);
  }
});

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
  </div>
</template>
