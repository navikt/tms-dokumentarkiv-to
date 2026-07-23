import node from "@astrojs/node";
import react from "@astrojs/react";
import mockServer from "@navikt/astro-mocks";
import { defineConfig } from "astro/config";
import dokumentarkiv from "./src/mocks/dokumentarkiv.json" with { type: "json" };

// https://astro.build/config
export default defineConfig({
  base: "/dokumentarkiv",
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-dokumentarkiv",
  },
  vite: {
    build: {
      sourcemap: true,
    },
  },
  integrations: [react(), mockServer({ mocks: dokumentarkiv })],
  logger: {
    entrypoint: "@navikt/astro-logger",
  },
  i18n: {
    defaultLocale: "nb",
    locales: ["nb", "nn", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  env: {
    schema: {},
  },
});
