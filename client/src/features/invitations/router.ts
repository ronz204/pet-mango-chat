import type { RouteRecordRaw } from "vue-router";
import InvitationsContainer from "./containers/InvitationsContainer.vue";
import { authGuard } from "@guards/auth.guard";

export const invitationsRoutes: RouteRecordRaw[] = [
  {
    path: "/invitations",
    name: "Invitations",
    component: InvitationsContainer,
    beforeEnter: authGuard,
  },
];
