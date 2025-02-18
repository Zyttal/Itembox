<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { logout } from '@/services/AuthService';

const router = useRouter();

const handleLogout = async () => {
  try {
    await logout();
    // Redirect to login page after successful logout
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    // You might want to show an error message to the user here
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
            <RouterLink to="/dashboard" active-class="active-route">
              Dashboard
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
