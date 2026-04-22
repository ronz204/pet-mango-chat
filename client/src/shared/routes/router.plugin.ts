import { createWebHistory, createRouter } from "vue-router";
import { invitationsRoutes } from "@features/invitations/router";
import { identityRoutes } from "@features/identity/routes";
import { roomsRoutes } from "@features/rooms/routes";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...invitationsRoutes,
    ...identityRoutes,
    ...roomsRoutes,
  ],
});
