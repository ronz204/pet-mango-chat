import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { identityService } from '@features/identity/services/identity.service';
import type { SignInRequest, SignUpRequest } from '@features/identity/services/identity.types';

const TOKEN_KEY = 'auth_token';

export const useAuthStore = defineStore('auth', () => {
  const error = ref<string | null>(null);
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));

  const isSigningIn = ref(false);
  const isSigningUp = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  const saveToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
  };

  const signIn = async (data: SignInRequest) => {
    isSigningIn.value = true;
    error.value = null;

    try {
      const response = await identityService.signIn(data);
      saveToken(response.token);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to sign in';
      throw err;
    } finally {
      isSigningIn.value = false;
    }
  };

  const signUp = async (data: SignUpRequest) => {
    isSigningUp.value = true;
    error.value = null;

    try {
      const response = await identityService.signUp(data);
      saveToken(response.token);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to sign up';
      throw err;
    } finally {
      isSigningUp.value = false;
    }
  };

  const signOut = () => {
    clearToken();
    error.value = null;
  };

  return {
    token,
    isAuthenticated,
    isSigningIn,
    isSigningUp,
    error,
    signIn,
    signUp,
    signOut,
  };
});
