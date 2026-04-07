import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";

import { Router } from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(Router);
app.use(VueQueryPlugin);

app.mount("#app");
