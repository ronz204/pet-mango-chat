import { createWebHistory, createRouter } from "vue-router";
import { IdentityRoutes } from "@features/identity/routes";

export const Router = createRouter({
  history: createWebHistory(),
  routes: [...IdentityRoutes],
});
