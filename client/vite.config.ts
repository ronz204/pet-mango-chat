import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ui from "@nuxt/ui/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), ui()],
  resolve: { alias: {
    "@api": "/src/api",
    "@assets": "/src/assets",
    "@features": "/src/features",

    "@hooks": "/src/shared/hooks",
    "@layouts": "/src/shared/layouts",
    "@guards": "/src/shared/guards",
    "@stores": "/src/shared/stores",
    "@routes": "/src/shared/routes",
  }},
});
