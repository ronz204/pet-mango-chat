import { createWebHistory, createRouter } from "vue-router";
import { identityRoutes } from "@features/identity/routes";
import Sample from "./Sample.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Sample",
      component: Sample,
    },
    ...identityRoutes,
  ],
});
