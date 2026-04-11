import { createWebHistory, createRouter } from "vue-router";
import { IdentityRoutes } from "@features/identity/routes";
import { authGuard } from "@guards/auth.guard";

export const Router = createRouter({
  history: createWebHistory(),
  routes: [...IdentityRoutes],
});

Router.beforeEach(authGuard);
