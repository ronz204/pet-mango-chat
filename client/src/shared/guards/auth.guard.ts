import type {
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";

const TOKEN_KEY = "auth_token";

export const AuthGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const isAuthenticated = !!token;

  if (to.meta.requiresGuest && isAuthenticated) {
    next("/rooms");
    return;
  };

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  };

  next();
};
