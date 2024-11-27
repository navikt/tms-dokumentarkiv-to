import { getEnvironmentClientSide } from "@utils/client/environment";

const MINE_SAKER_API_URL = {
  local: "http://localhost:3000/mine-saker-api",
  dev: "https://www.intern.dev.nav.no/mine-saker-api",
  ansatt: "https://www.ansatt.dev.nav.no/mine-saker-api",
  prod: "https://person.nav.no/mine-saker-api",
};

const BASE_URL = {
  local: "http://localhost:4321",
  dev: "https://www.intern.dev.nav.no",
  ansatt: "https://www.ansatt.dev.nav.no",
  prod: "https://www.nav.no",
};

const BASE_URL_INTERN = {
  local: "http://localhost:4321",
  dev: "https://www.intern.dev.nav.no",
  ansatt: "https://www.intern.dev.nav.no",
  prod: "https://www.intern.nav.no",
};

const DIGISOS_REDIRECT_URL = {
  local: "http://localhost:4321/sosialhjelp/innsyn",
  dev: "https://www-q0.dev.nav.no/sosialhjelp/innsyn/",
  ansatt: "https://www-q0.dev.nav.no/sosialhjelp/innsyn/",
  prod: "https://www.nav.no/sosialhjelp/innsyn/",
};

export const mineSakerApiUrl = MINE_SAKER_API_URL[getEnvironmentClientSide()];
export const authenticationUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/login/status`;
export const getSakstemaerUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/sakstemaer`;
export const dokumentUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/dokument`;
export const getFullmaktForhold = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/fullmakt/forhold`;
export const postUserUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/fullmakt/representert`;
export const getFullmaktInfoUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/fullmakt/info`;
export const hasDigisosContentUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/v2/sosialhjelp/har_innsendte`

export const baseUrl = BASE_URL[getEnvironmentClientSide()];
export const internBaseUrl = BASE_URL_INTERN[getEnvironmentClientSide()];
export const minSideUrl = `${BASE_URL[getEnvironmentClientSide()]}/minside`;
export const dokumentArkivUrl = `${BASE_URL[getEnvironmentClientSide()]}/dokumentarkiv`;
export const pdlFullmaktUrl = `${BASE_URL[getEnvironmentClientSide()]}/person/pdl-fullmakt-ui/`;
export const digisosRedirectUrl = DIGISOS_REDIRECT_URL[getEnvironmentClientSide()];
export const kontaktOssUrl = `${BASE_URL[getEnvironmentClientSide()]}/kontaktoss`;

export const getJournalposterUrl = (tema: string) => `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/v2/sakstema/${tema}/journalposter`;
export const getAlleJournalposterUrl = `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/v2/journalposter/alle`;
export const getJournalpostUrl = (journalpostId: string) => `${MINE_SAKER_API_URL[getEnvironmentClientSide()]}/v2/journalposter/journalpost/${journalpostId}`;


export const baseUrlWithLanguage = {
  nb: `${baseUrl}/dokumentarkiv-to`,
  en: `${baseUrl}/dokumentarkiv-to/en`,
  nn: `${baseUrl}/dokumentarkiv-to/nn`,
};
