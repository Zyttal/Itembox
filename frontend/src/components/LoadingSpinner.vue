<template>
  <div v-if="LoadingService.isLoading" class="loading-overlay">
    <VueSpinnerDots size="50" color="#ffffffb3" />
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerDots } from 'vue3-spinners'
import LoadingService from '@/services/LoadingService'
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
