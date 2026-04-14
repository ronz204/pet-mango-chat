import type { NavigationGuardWithThis } from "vue-router";
import { useAuthStore } from "@stores/auth.store";

export const authGuard: NavigationGuardWithThis<undefined> = () => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return { name: "Login" };
  };
};
