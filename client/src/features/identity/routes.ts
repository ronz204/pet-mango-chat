import type { RouteRecordRaw } from "vue-router";
import LoginContainer from "./containers/LoginContainer.vue";
import RegisterContainer from "./containers/RegisterContainer.vue";

export const IdentityRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginContainer,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterContainer,
    meta: { requiresGuest: true },
  },
];
