<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ModalsContainer } from 'vue-final-modal';

</script>

<template>
  <LoadingSpinner />
  <RouterView />
  <ModalsContainer />
</template>
