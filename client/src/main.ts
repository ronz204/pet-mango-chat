import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { Router } from "./router";

const app = createApp(App);
app.use(Router);
app.mount("#app");
