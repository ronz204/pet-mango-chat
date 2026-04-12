import type { RouteRecordRaw } from "vue-router";
import LoginContainer from "./containers/LoginContainer.vue";

export const identityRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginContainer,
  },
];
