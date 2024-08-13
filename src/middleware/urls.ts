import { getEnvironment } from "@utils/server/environment";

const REDIRECT_URI = {
  dev: "https://www.intern.dev.nav.no/dokumentarkiv-to",
  prod: "https://www.nav.no/dokumentarkiv",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/dokumentarkiv-to/oauth2/login?redirect=${redirectUri}`;
