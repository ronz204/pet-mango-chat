import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

import { router } from "./router";

import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(VueQueryPlugin);

app.mount("#app");
