<script setup lang="ts">
import type { Item, ItemCreate } from '@/types/items';
import { onMounted, ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { formatDate } from '@/utils/formatDate';

const props = defineProps<{
  itemId: number,
  onView: (id: number) => Promise<Item>
}>();

const item = ref<Item | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true;
    item.value = await props.onView(props.itemId);
  } catch (err) {
    error.value = 'Failed to load item details';
    console.error(err)
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <VueFinalModal class="custom-modal" content-class="custom-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="item">
      <h1>View Item</h1>
      <div class="item-details">
        <h2>{{ item.title }}</h2>
        <p>{{ item.item_description }}</p>
        <p>{{ formatDate(item.created_at) }}</p>
        <p>{{ formatDate(item.updated_at) }}</p>
      </div>
    </div>
  </VueFinalModal>
</template>
