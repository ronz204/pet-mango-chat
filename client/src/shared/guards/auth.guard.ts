import type { NavigationGuardWithThis } from "vue-router";
import { useSessionStore } from "@stores/session.store";

export const authGuard: NavigationGuardWithThis<undefined> = (to) => {
  const session = useSessionStore();

  const requiresAuth = to.meta.requiresAuth === true;
  const requiresGuest = to.meta.requiresGuest === true;

  if (requiresAuth && !session.isAuthenticated) {
    return { name: "sign-in" };
  };

  if (requiresGuest && session.isAuthenticated) {
    return { name: "home" };
  };
};
