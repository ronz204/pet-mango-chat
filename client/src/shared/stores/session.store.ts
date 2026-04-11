import { ref, computed } from "vue";
import { defineStore } from "pinia";

const TOKEN_KEY: string = "mango:token";

export const useSessionStore = defineStore("session", () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const isAuthenticated = computed(() => token.value !== null);

  function setAuthToken(value: string): void {
    token.value = value;
    localStorage.setItem(TOKEN_KEY, value);
  };

  function dropAuthToken(): void {
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
  };

  return { token, isAuthenticated, setAuthToken, dropAuthToken };
});
