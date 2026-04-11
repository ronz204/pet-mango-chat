import type { RouteRecordRaw } from "vue-router";
import SignInContainer from "./containers/SignInContainer.vue";
import SignUpContainer from "./containers/SignUpContainer.vue";

export const IdentityRoutes: RouteRecordRaw[] = [
  {
    name: "sign-in",
    path: "/sign-in",
    component: SignInContainer,
    meta: { requiresGuest: true },
  },
  {
    name: "sign-up",
    path: "/sign-up",
    component: SignUpContainer,
    meta: { requiresGuest: true },
  },
];
