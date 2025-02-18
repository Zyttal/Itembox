<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import SnackbarService from '@/services/SnackBarService';
import { login } from '@/services/AuthService';

const router = useRouter();

const credentials = ref({
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    await login(credentials.value)
    SnackbarService.success('Login successful!')
    router.push('/dashboard')
  } catch (error: any) {
    SnackbarService.error(error.message || 'Login failed')
  }
}

const goToRegister = () => {
  router.push({name: 'register'});
}
</script>

<template>
  <div class="login-layout">
    <!-- Left Column -->
    <div class="login-form-container">
      <div class="form-wrapper">
        <h1 class="heading">Log in to your Account</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" v-model="credentials.email" placeholder="Enter your email" required class="form-input">
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" v-model="credentials.password" placeholder="Enter your password" required class="form-input">
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
      <p class="subtitle">Don't have an account? <span @click="goToRegister">Register now.</span></p>
    </div>

    <!-- Right Column -->
    <div class="brand-section">
      <img src="@/assets/logos/vue_logo.svg" alt="">
    </div>
  </div>
</template>

<style>
.login-layout {
  display: flex;
  min-height: 100vh;
}

.brand-section img {
  width: 15rem;
}

.login-form-container {
  flex: 0 0 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  width: 100%;
}

.heading {
  margin-bottom: 1rem;
}

.brand-section {
  flex: 0 0 50%;
  background-color: var(--vt-c-black-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtitle {
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.subtitle span {
  color: var(--vt-c-white-mute);
  transition: all 0.3s ease;
  cursor: pointer;
}

.subtitle span:hover {
  color: var(--vt-c-white);
  font-size: 115%;

}
</style>
