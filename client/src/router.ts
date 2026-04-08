import { AuthGuard } from "@guards/auth.guard";
import { IdentityRoutes } from "@features/identity/routes";
import { createWebHistory, createRouter } from "vue-router";

export const Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...IdentityRoutes,
  ],
});

Router.beforeEach(AuthGuard);
