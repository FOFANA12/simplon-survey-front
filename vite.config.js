import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
      },
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "pinia",
        "@vueuse/core",
        {
          "@vueuse/head": ["useHead"],
        },
      ],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:{
    host: '127.0.0.1',
    port: '8080',
  },
});
