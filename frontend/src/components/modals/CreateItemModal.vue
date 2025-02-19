<script setup lang="ts">
import type { ItemCreate } from '@/types/items';
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'submit', item: ItemCreate): void
}>()

const itemName = ref('')
const itemDescription = ref('')

const handleSubmit = () => {
  emit('submit', {
    title: itemName.value,
    item_description: itemDescription.value
  })

  // Reset form
  itemName.value = ''
  itemDescription.value = ''
}
</script>

<template>
  <VueFinalModal
    class="custom-modal"
    content-class="custom-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>Create an Item</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">Item Name</label>
        <input
          v-model="itemName"
          type="text"
          placeholder="Enter item name"
          required
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label class="form-label">Item Description</label>
        <input
          v-model="itemDescription"
          type="text"
          placeholder="Enter item description"
          required
          class="form-input"
        >
      </div>

      <button type="submit">Create Item</button>
    </form>
  </VueFinalModal>
</template>
