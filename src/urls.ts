import { getEnvironment } from "@utils/server/environment";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:4321",
  dev: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  prod: "https://www.nav.no/tms-min-side-proxy",
};

const BASE_URL = {
  local: "http://localhost:4321/dokumentarkiv-to",
  dev: "https://www.intern.dev.nav.no/dokumentarkiv-to",
  prod: "https://www.nav.no/dokumentarkiv-to",
};
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];