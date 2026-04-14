import { createWebHistory, createRouter } from "vue-router";
import { identityRoutes } from "@features/identity/routes";
import { roomsRoutes } from "@features/rooms/routes";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...identityRoutes,
    ...roomsRoutes,
  ],
});
