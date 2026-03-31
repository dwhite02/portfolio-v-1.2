import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  site: "https://dontewhite.com",
  integrations: [vue(), sitemap()],
  vite: {
    css: {
      devSourcemap: true,
    },
    plugins: [tailwindcss()],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
