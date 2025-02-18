<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { defineComponent } from 'vue'


defineComponent({
  components: {
    LoadingSpinner
  }
})
</script>

<template>
  <LoadingSpinner />
  <RouterView></RouterView>
</template>
