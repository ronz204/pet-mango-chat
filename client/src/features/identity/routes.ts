import type { RouteRecordRaw } from "vue-router";
import LoginContainer from "./containers/LoginContainer.vue";
import RegisterContainer from "./containers/RegisterContainer.vue";

export const identityRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginContainer,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterContainer,
  },
];
