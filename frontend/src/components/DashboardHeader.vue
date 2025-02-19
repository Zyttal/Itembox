<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { logout } from '@/services/AuthService';
import LoadingService from '@/services/LoadingService';

const router = useRouter();

const handleLogout = async () => {
  try {
    LoadingService.start();
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    LoadingService.stop();
  }
};
</script>

<template>
  <header class="dashboard-header">
    <div class="header-left">
      <img class="logo" src="@/assets/logos/vue_logo.svg" alt="Vue Logo">
      <div class="pill">
        <p>User Dashboard</p>
      </div>
      <nav class="nav-links">
        <ul>
          <li>
            <RouterLink to="/items" active-class="active-route">
              Items
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/my-items" active-class="active-route">
              My Items
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/profile" active-class="active-route">
              Profile
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="header-right">
      <a href="#" @click.prevent="handleLogout">Log Out</a>
    </div>
  </header>
</template>

<style scoped>
.active-route {
  opacity: 1;
  font-weight: bold;
}
</style>
