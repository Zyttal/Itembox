<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue';
import { getUser } from '@/services/AuthService';
import LoadingService from '@/services/LoadingService';
import type { User } from '@/types/user';
import { formatDate } from '@/utils/formatDate';
import { ref, onMounted } from 'vue';

const user = ref<User | null>(null);
const error = ref<string | null>(null);

const fetchUser = async () => {
  try {
    LoadingService.start;
    user.value = await getUser();
  } catch (err) {
    error.value = 'Failed to load user profile';
    console.error(err);
  } finally {
    LoadingService.stop;
  }
}

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div>
    <DashboardHeader />

    <main class="profile-container">
      <div v-if="user" class="profile-section">
        <div class="title-section">
          <h2>Profile Information</h2>
        </div>

        <div class="info-grid">
          <div class="info-row">
            <div class="info-label">Name</div>
            <div class="info-value">{{ user.name }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">User ID</div>
            <div class="info-value">{{ user.id }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Email</div>
            <div class="info-value">{{ user.email }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Email Verified</div>
            <div class="info-value">{{ formatDate(user.email_verified_at) }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Member Since</div>
            <div class="info-value">{{ formatDate(user.created_at) }}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Last Updated</div>
            <div class="info-value">{{ formatDate(user.updated_at) }}</div>
          </div>
        </div>
      </div>

      <div v-else class="loading-state">
        <p>Loading profile information...</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.profile-section {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.title-section {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.title-section h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.info-grid {
  padding: 0.5rem;
}

.info-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  border-bottom: 1px solid var(--color-border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  padding: 1rem;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 400;
}

.info-value {
  padding: 1rem;
  color: var(--color-text);
}

.loading-state {
  text-align: center;
  padding: 3rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
}

@media (max-width: 600px) {
  .profile-container {
    margin: 1rem auto;
  }

  .info-row {
    grid-template-columns: 120px 1fr;
  }

  .info-label, .info-value {
    padding: 0.75rem;
  }
}
</style>
