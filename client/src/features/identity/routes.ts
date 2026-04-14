import type { RouteRecordRaw } from "vue-router";
import LoginContainer from "./containers/LoginContainer.vue";
import RegisterContainer from "./containers/RegisterContainer.vue";
import ProfileContainer from "./containers/ProfileContainer.vue";
import { guestGuard } from "@guards/guest.guard";
import { authGuard } from "@guards/auth.guard";

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
  {
    path: "/profile",
    name: "Profile",
    component: ProfileContainer,
    beforeEnter: authGuard,
  },
];
