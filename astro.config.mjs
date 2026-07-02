import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  base: "/dokumentarkiv",
  // Astro 7 changed the default to 'jsx', which strips spaces between inline
  // elements. Pin to HTML-aware compression to keep rendered output identical
  // to Astro 5 (no whitespace regressions in user-facing Norwegian copy).
  compressHTML: true,
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-dokumentarkiv",
  },
  integrations: [react()],
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
