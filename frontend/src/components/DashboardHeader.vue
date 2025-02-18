<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="dashboard-header">
    <div class="header-left">
      <img class="logo" src="@/assets/logos/vue_logo.svg" alt="">
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
      <p>Log Out</p>
    </div>
  </header>
</template>

<style scoped>
.active-route {
  opacity: 1;
  font-weight: bold;
}
</style>
