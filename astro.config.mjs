import {defineConfig, envField} from "astro/config";
import {rollupImportMapPlugin} from "rollup-plugin-import-map";
import importmap from "./importmap.json";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  base: "/dokumentarkiv",
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-dokumentarkiv",
  },
  integrations: [
    react(),
    {
      name: "importmap",
      hooks: {
        "astro:build:setup": ({vite, target}) => {
          if (target === "client") {
            vite.plugins.push({
              ...rollupImportMapPlugin(importmap),
              enforce: "pre",
              apply: "build",
            });
          }
        },
      },
    },
  ],
  i18n: {
    defaultLocale: "nb",
    locales: ["nb", "nn", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  env: {
    schema: {
      REDIRECT_URI: envField.string({
        context: "server",
        access: "secret",
        default: "http://localhost:3000/dokumentarkiv",
      }),
    },
  },
});
