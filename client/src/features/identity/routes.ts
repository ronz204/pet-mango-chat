import type { RouteRecordRaw } from "vue-router";
import LoginContainer from "./containers/LoginContainer.vue";
import RegisterContainer from "./containers/RegisterContainer.vue";
import { guestGuard } from "@guards/guest.guard";

export const identityRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginContainer,
    beforeEnter: guestGuard,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterContainer,
    beforeEnter: guestGuard,
  },
];
