import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: {
    "@api": "/src/api",
    "@assets": "/src/assets",

    "@guards": "/src/shared/guards",
    "@stores": "/src/shared/stores",
    "@helpers": "/src/shared/helpers",

    "@schemas": "/src/schemas",
    "@features": "/src/features",
    "@providers": "/src/providers",

    "@atoms": "/src/components/atoms",
    "@layouts": "/src/components/layouts",
    "@molecules": "/src/components/molecules",
    "@organisms": "/src/components/organisms",
  }},
});
