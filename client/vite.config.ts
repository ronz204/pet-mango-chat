import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: {
    "@guards": "/src/shared/guards",
    "@stores": "/src/shared/stores",
    "@helpers": "/src/shared/helpers",

    "@features": "/src/features",
    "@services": "/src/services",
    "@schemas": "/src/schemas",

    "@atoms": "/src/components/atoms",
    "@layouts": "/src/components/layouts",
    "@molecules": "/src/components/molecules",
    "@organisms": "/src/components/organisms",
  }},
});
