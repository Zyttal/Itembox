<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue';
</script>

<template>
  <DashboardHeader />

  <!-- Items Table -->
  <div class="table-container">
    <!-- Table head -->
    <div class="table-header">
      <h3 class="title">Items</h3>
      <button>+ Add Item</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="item-name">
              <span class="item-name">Manga Volume 1</span>
            </div>
          </td>
          <td>
            <div class="item-description">
              <span class="item-details">A sample Item Description</span>
            </div>
          </td>
          <td>
            <div class="action-buttons">
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Delete</button>
            </div>
          </td>
        </tr>
        <!-- Dynamic Rows will be added later -->
      </tbody>
    </table>
  </div>

</template>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
