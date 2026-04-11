import App from "./App.vue";
import { createApp } from "vue";

import "@assets/styles/main.css";
import ui from "@nuxt/ui/vue-plugin";
import { pinia } from "@stores/pinia.plugin";
import { router } from "@routes/router.plugin";

import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(ui);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
