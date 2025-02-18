<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import SnackbarService from '@/services/SnackBarService';
import type { UserRegistrationData } from '@/types/UserRegistrationData';
import { register } from '@/services/AuthService';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const userData = ref<UserRegistrationData>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const passwordsMatch = computed(() => {
  return password.value == confirmPassword.value;
});

const handleRegistration = async () => {
  // Sync ref values with userData
  userData.value = {
    name: 'test bruh',
    email: email.value,
    password: password.value,
    password_confirmation: confirmPassword.value
  }

  if (!passwordsMatch.value) {
    SnackbarService.error("Passwords do not Match!")
    return;
  }

  try {
    await register(userData.value)
    // 204 No Content means successful registration
    SnackbarService.success("Registration Successful!")
    router.push({ name: 'login' });
  } catch (error: any) {
    // Handle validation errors
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;

      // Display first error message
      if (errors.email) {
        SnackbarService.error(errors.email[0]);
      } else if (errors.password) {
        SnackbarService.error(errors.password[0]);
      } else {
        SnackbarService.error("Registration Failed");
      }
    } else {
      SnackbarService.error("An unexpected error occurred");
    }
  }
}

const goToLogin = () => {
  router.push({ name: 'login' });
}
</script>

<template>
  <div class="register-layout">
    <!-- Left Column -->
    <div class="register-form-container">
      <div class="form-wrapper">
        <h1 class="heading">Register an Account</h1>
        <form @submit.prevent="handleRegistration">
          <div class="form-group">
            <label class="form-label">Name</label>
            <input type="name" v-model="name" placeholder="Enter your name" required class="form-input">
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" v-model="email" placeholder="Enter your email" required class="form-input">
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" v-model="password" placeholder="Enter your password " required class="form-input">
          </div>

          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="confirmPassword" v-model="confirmPassword" placeholder="Enter your password again" required class="form-input">
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
      <p class="subtitle">Have an account? <span @click="goToLogin">Register now.</span></p>
    </div>

    <!-- Right Column -->
    <div class="brand-section">
      <img src="@/assets/logos/vue_logo.svg" alt="">
    </div>
  </div>
</template>

<style>
.register-layout {
  display: flex;
  min-height: 100vh;
}

.brand-section img {
  width: 15rem;
}

.register-form-container {
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
