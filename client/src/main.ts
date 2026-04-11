import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";

import { pinia } from "@stores/pinia.plugin";
import { router } from "@routes/router.plugin";

import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
