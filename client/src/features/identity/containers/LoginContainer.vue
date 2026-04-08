<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@stores/auth.store';
import { useRouter, RouterLink } from 'vue-router';
import LoginForm from '../components/organisms/LoginForm.vue';

const router = useRouter();
const authStore = useAuthStore();

const errorMessage = computed(() => authStore.error || undefined);

const handleSubmit = async (data: { email: string; password: string }) => {
  try {
    await authStore.signIn(data);
    router.push('/rooms');
  } catch (error) {
    // Error is handled by the store
  }
};
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 mb-4">
          <span class="text-3xl font-headline font-bold text-white">M</span>
        </div>
        <h1 class="font-headline text-3xl font-bold text-neutral-900 mb-2">
          Mango
        </h1>
        <p class="font-body text-base text-neutral-600">
          Step into the Living Canvas.
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="mb-6">
          <h2 class="font-headline text-2xl font-bold text-neutral-900 mb-1">
            Login to your account
          </h2>
          <p class="font-body text-sm text-neutral-600">
            Don't have an account?
            <RouterLink to="/register" class="text-primary-600 hover:text-primary-700 font-medium transition-colors">
              Sign up for free
            </RouterLink>
          </p>
        </div>

        <LoginForm :is-loading="authStore.isSigningIn" :error-message="errorMessage" @submit="handleSubmit" />
      </div>

      <!-- Footer -->
      <p class="text-center font-body text-sm text-neutral-500 mt-6">
        By continuing, you agree to Mango's
        <a href="#" class="text-neutral-700 hover:text-primary-600 transition-colors">Terms of Service</a>
        and
        <a href="#" class="text-neutral-700 hover:text-primary-600 transition-colors">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>
