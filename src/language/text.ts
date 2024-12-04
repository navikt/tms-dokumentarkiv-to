export const text = {
  dokumenter: {
    nb: "Dokumenter",
    nn: "Dokument",
    en: "Documents",
  },
  minSide: {
    nb: "Min side",
    nn: "Mi side",
    en: "My page",
  },
  antallVedlegg: {
    nb: (antall: number) => `Dokumentet har ${antall} vedlegg`,
    nn: (antall: number) => `Dokumentet har ${antall} vedlegg`,
    en: (antall: number) => `The document has ${antall} attachments`,
  },
  viserAntallDokumenter: {
    nb: (synlige: number, antall: number ) => `Viser ${synlige} av ${antall} dokumenter`,
    nn: (synlige: number, antall: number ) => `Viser ${synlige} av ${antall} dokument`,
    en: (synlige: number, antall: number ) => `Showing ${synlige} of ${antall} documents`,
  },
  lasterInn: {
    nb: "Laster...",
    nn: "Laster...",
    en: "Loading",
  },
  representasjonLabel: {
    nb: "Hvem vil du bruke dokumentarkivet på vegne av?",
    nn: "Kven vil du bruke dokumentarkivet på vegner av?",
    en: "Which users documents would you like to view?",
  },
  representasjonStandardTekst: {
    nb: "Alle dokumenter som er registrert på ",
    nn: "Alle dokument som er registrert på ",
    en: "All documents registered for ",
  },
  sosialhjelpTekst: {
    nb: "Dokumenter om ",
    nn: "Dokument om ",
    en: "Documents regarding ",
  },
  sosialhjelpLenketekst: {
    nb: "økonomisk sosialhjelp finner du her.",
    nn: "økonomisk sosialhjelp finn du her.",
    en: "økonomisk sosialhjelp can be found on this page.",
  },
  representasjonDeg: {
    nb: " (Deg)",
    nn: " (Deg)",
    en: " (You)",
  },
  representasjonLenkeTekst: {
    nb: "Se digitale fullmakter",
    nn: "Sjå digitale fullmakter",
    en: "See your digital powers of attorney",
  },
  landingssideDisclaimerTittel: {
    nb: "Finner du ikke det du leter etter?",
    nn: "Finn du ikkje det du leitar etter?",
    en: "Do you not find what you were looking for?",
  },
  landingssideDisclaimerListepunktTo: {
    nb: "Vi viser dokumenter i saker nyere enn 2016. For bidragssaker kan du kun se dokumenter fra starten av 2022.",
    nn: "Vi viser dokument i sakar nyare enn 2016. For bidragssakar kan du kun sjå dokument frå starten av 2022.",
    en: "For contribution matters, we are only able to present documents starting from 2022.",
  },
  ingenJournalposter: {
    nb: "Ingen registrerte saker eller dokumenter å vise",
    nn: "Ingen registrerte sakar eller dokument å vise",
    en: "No registered cases or documents to show",
  },
  finnerIkkeDokument: {
    nb: "Kunne ikke finne dokument",
    nn: "Kunne ikkje finne dokument",
    en: "Could not find document",
  },
  nyttigOgVite: {
    nb: "Nyttig å vite",
    nn: "Nyttig å vite",
    en: "Useful information",
  },
  lenke1: {
    nb: "Saksbehandlingstider",
    nn: "Saksbehandlingstider",
    en: "Processing times",
  },
  lenke2: {
    nb: "Klage på vedtak",
    nn: "Klage på vedtak",
    en: "Appeal against decisions",
  },
  lenke3: {
    nb: "Kontakt oss",
    nn: "Kontakt oss",
    en: "Contact us",
  },
  temaLenkeDel1: {
    nb: "På ",
    nn: "På ",
    en: "On ",
  },
  temaLenkeDel2: {
    nb: " finner du informasjon om endringer og status i saken din.",
    nn: " kan du finne informasjon om endringar og status i saken din.",
    en: " you will find information about changes and status on your case.",
  },
  sykOgSymLenke: {
    nb: "Ditt sykefravær",
    nn: "Ditt sjukefråvær",
    en: "Sickness benefit",
  },
  vedleggTitle: {
    nb: "Vedlegg",
    nn: "Vedlegg",
    en: "Attachments",
  },
  visVedlegg: {
    nb: "Vis vedlegg",
    nn: "Vis vedlegg",
    en: "Show attachments",
  },
  skjulVedlegg: {
    nb: "Skjul vedlegg",
    nn: "Skjul vedlegg",
    en: "Hide attachments",
  },
  vedleggKanIkkeVises: {
    nb: " (kan ikke vises)",
    nn: " (kan ikkje visast)",
    en: " (can not show)",
  },
  detaljerTitle: {
    nb: "Detaljer",
    nn: "Detaljar",
    en: "Details",
  },
  datoTitle: {
    nb: "Dato opprettet",
    nn: "Dato oppretta",
    en: "Date created",
  },
  temaTitle: {
    nb: "Tema",
    nn: "Tema",
    en: "Theme",
  },
  sendtInnTitle: {
    nb: "Sendt inn av",
    nn: "Sendt inn av",
    en: "Sent by",
  },
  sendtTilTitle: {
    nb: "Sendt til",
    nn: "Sendt til",
    en: "Sent too",
  },
  feilmelding: {
    nb: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
    en: "We're having technical difficulties. Some information may not be available, please try again later.",
    nn: "Vi har tekniske problem akkurat no. Dette kan føre til at du ikkje får opp all informasjon. Ver venleg og prøv igjen seinare.",
  },
  filtersTitle: {
    nb: "Velg hvilke dokumenter du vil se",
    nn: "Vel dokumenta du vil sjå",
    en: "Choose which category of documents you wish to see",
  },
  tilgangssperreSkannet: {
    nb: "Du får ikke åpnet dokumenter du har sendt i papirpost. ",
    nn: "Du får ikkje opna dokument du har sendt i papirpost. ",
    en: "You can not open documents sendt by mail. ",
  },
  tilgangssperreTredjepart: {
    nb: "Du får ikke åpnet dette dokumentet fordi det er sendt av noen andre enn deg. ",
    nn: "Du får ikkje opna dette dokumentet fordi det er sendt av nokon andre enn deg. ",
    en: "You can not open this document because it sent by someone other than yourself. ",
  },
  tilgangssperreAnnet: {
    nb: "Du får ikke åpnet dette dokumentet. ",
    nn: "Du får ikkje opna dette dokumentet. ",
    en: "You can not open this document. ",
  },
};