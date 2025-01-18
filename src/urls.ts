import { getEnvironment } from "@utils/server/environment";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:4321",
  ansatt: "https://www.ansatt.dev.nav.no/tms-min-side-proxy",
  prod: "https://www.nav.no/tms-min-side-proxy",
};

const MINE_SAKER_API_URL = {
  local: "http://localhost:3000/mine-saker-api",
  ansatt: "https://www.ansatt.dev.nav.no/mine-saker-api",
  prod: "https://person.nav.no/mine-saker-api",
};

const BASE_URL = {
  local: "http://localhost:4321/dokumentarkiv",
  ansatt: "https://www.ansatt.dev.nav.no/dokumentarkiv",
  prod: "https://www.nav.no/dokumentarkiv",
};

const NAV_NO_URL = {
  local: "http://localhost:4321",
  ansatt: "https://www.ansatt.dev.nav.no",
  prod: "https://www.nav.no",
};

const ERROR_REPORTING_URL = {
  local:
    'https://www.intern.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler',
  ansatt:
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
export const getJournalpostUrl = (journalpostId: string) => `${MINE_SAKER_API_URL[getEnvironment()]}/v2/journalposter/journalpost/${journalpostId}`;
export const dokumentUrl = `${MINE_SAKER_API_URL[getEnvironment()]}/dokument`;

export const baseUrlWithLanguage = {
  nb: `${baseUrl}`,
  en: `${baseUrl}/en`,
  nn: `${baseUrl}/nn`,
};