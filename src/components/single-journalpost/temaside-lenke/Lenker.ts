import { getEnvironmentClientSide } from "@utils/client/environment";

const DAGPENGER = {
  local: "https://localhost:3000/arbeid/dagpenger/mine-dagpenger",
  dev: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
  ansatt: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
  prod: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
};

const FORELDREPENGER = {
  local: "https://foreldrepenger.nav.no/",
  dev: "https://foreldrepenger.dev.nav.no/",
  ansatt: "https://foreldrepenger.dev.nav.no/",
  prod: "https://foreldrepenger.nav.no/",
};

const HJELPEMIDLER = {
  local: "https://localhost:3000//hjelpemidler/dinehjelpemidler",
  dev: "https://hjelpemidler.dev.nav.no/hjelpemidler/dinehjelpemidler",
  ansatt: "https://hjelpemidler.dev.nav.no/hjelpemidler/dinehjelpemidler",
  prod: "https://www.nav.no/hjelpemidler/dinehjelpemidler",
};

const SOSIALHJELP = {
  local: "https://localhost:3000/sosialhjelp/innsyn",
  dev: "https://www-q1.dev.nav.no/sosialhjelp/innsyn",
  ansatt: "https://www-q1.dev.nav.no/sosialhjelp/innsyn",
  prod: "https://www.nav.no/sosialhjelp/innsyn",
};

const PENSJON = {
  local: "https://localhost:3000/dinpensjon",
  dev: "https://pensjon-selvbetjening-dinpensjon-frontend-borger-q2.intern.dev.nav.no/pensjon/selvbetjening/dinpensjon",
  ansatt: "https://pensjon-selvbetjening-dinpensjon-frontend-borger-q2.intern.dev.nav.no/pensjon/selvbetjening/dinpensjon",
  prod: "https://www.nav.no/pensjon/selvbetjening/dinpensjon",
};

const UFORETRYGD = {
  local: "https://localhost:3000/uforetrygd",
  dev: "https://uforetrygd-selvbetjening-frontend-borger.intern.dev.nav.no/uforetrygd/selvbetjening",
  ansatt: "https://uforetrygd-selvbetjening-frontend-borger.ansatt.dev.nav.no/uforetrygd/selvbetjening",
  prod: "https://www.nav.no/uforetrygd/selvbetjening",
};

export const dagpengerUrl = DAGPENGER[getEnvironmentClientSide()];
export const hjelpemidlerUrl = HJELPEMIDLER[getEnvironmentClientSide()];
export const foreldrepengerUrl = FORELDREPENGER[getEnvironmentClientSide()];
export const sosialhjelpUrl = SOSIALHJELP[getEnvironmentClientSide()];
export const pensjonsUrl = PENSJON[getEnvironmentClientSide()];
export const uforetrygdUrl = UFORETRYGD[getEnvironmentClientSide()];
export const arbeidsavklaringspengerUrl = "https://www.nav.no/aap/mine-aap/";
export const sykefravaerUrl = "https://www.nav.no/syk/sykefravaer"
export const omsorgspengerUrl = "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn";

export const lenker = {
  DAG: dagpengerUrl,
  HJE: hjelpemidlerUrl,
  FOR: foreldrepengerUrl,
  KOM: sosialhjelpUrl,
  AAP: arbeidsavklaringspengerUrl,
  SYK: sykefravaerUrl,
  SYM: sykefravaerUrl,
  PEN: pensjonsUrl,
  UFO: uforetrygdUrl,
  OMS: omsorgspengerUrl
};