import { createWebHistory, createRouter } from "vue-router";
import Sample from "./Sample.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Sample",
      component: Sample,
    },
  ],
});
