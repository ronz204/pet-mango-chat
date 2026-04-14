import type { RouteRecordRaw } from "vue-router";
import RoomsContainer from "./containers/RoomsContainer.vue";
import { authGuard } from "@guards/auth.guard";

export const roomsRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/rooms",
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: RoomsContainer,
    beforeEnter: authGuard,
  },
  {
    path: "/rooms/:roomId",
    name: "Room",
    component: RoomsContainer,
    beforeEnter: authGuard,
  },
];
