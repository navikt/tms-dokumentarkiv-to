import { getEnvironment } from "@utils/server/environment";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:4321",
  dev: "https://www.ansatt.dev.nav.no/tms-min-side-proxy",
  prod: "https://www.nav.no/tms-min-side-proxy",
};

const BASE_URL = {
  local: "http://localhost:4321/dokumentarkiv-to",
  dev: "https://www.ansatt.dev.nav.no/dokumentarkiv-to",
  prod: "https://www.nav.no/dokumentarkiv-to",
};

const NAV_NO_URL = {
  local: "http://localhost:4321",
  dev: "https://www.ansatt.dev.nav.no",
  prod: "https://www.nav.no",
};

const ERROR_REPORTING_URL = {
  local:
    'https://www.intern.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
  dev:
    'https://www.intern.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
  prod:
    'https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
};

export const minSideUrl = `${NAV_NO_URL[getEnvironment()]}/minside`;
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const errorReportingUrl = ERROR_REPORTING_URL[getEnvironment()];
export const navNoUrl = NAV_NO_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];
export const tilbakemeldingerUrl = "https://www.nav.no/person/kontakt-oss/tilbakemeldinger";
export const saksbehandlingstiderUrl = "https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav";
export const kontaktOssUrl = `${NAV_NO_URL[getEnvironment()]}/kontaktoss`;

export const baseUrlWithLanguage = {
  nb: `${baseUrl}`,
  en: `${baseUrl}/en`,
  nn: `${baseUrl}/nn`,
};