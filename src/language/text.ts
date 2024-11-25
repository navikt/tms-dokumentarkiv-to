export const text = {
  dokumentarkiv: {
    nb: "Dokumentarkiv",
    nn: "Dokumentarkiv",
    en: "Document archive",
  },
  dokumenter: {
    nb: "Dokumenter",
    nn: "Dokumenter",
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
    nn: (synlige: number, antall: number ) => `Viser ${synlige} av ${antall} dokumenter`,
    en: (synlige: number, antall: number ) => `Showing ${synlige} of ${antall} documents`,
  },
  dokumentArkivTittel: {
    nb: "Dokumentarkiv",
    nn: "Dokumentarkiv",
    en: "Document archive",
  },
  dokumentTittelEntall: {
    nb: "Dokument",
    nn: "Dokument",
    en: "Document",
  },
  seAlleDokumenter: {
    nb: "Se alle dokumenter",
    nn: "Sjå alle dokument",
    en: "See all documents",
  },
  dokumentListeTittel: {
    nb: "Dokumenter",
    nn: "Dokumenter",
    en: "Documents",
  },
  dokumentArkivIngress: {
    nb: "Her finner du alle journalførte dokumenter relatert til",
    nn: "Her finn du alle journalførte dokument knytt til",
    en: "Here you will find all archived documents related to",
  },
  sendtAv: {
    nb: (avsender: string) => `Fra ${avsender}`,
    nn: (avsender: string) => `Fra ${avsender}`,
    en: (avsender: string) => `From ${avsender}`,
  },
  sendtTil: {
    nb: (avsender: string) => `Til ${avsender}`,
    nn: (avsender: string) => `Til ${avsender}`,
    en: (avsender: string) => `Too ${avsender}`,
  },
  lasterInn: {
    nb: "Tredjepart",
    nn: "Tredjepart",
    en: "Third party",
  },
  representasjonLabel: {
    nb: "Hvem vil du bruke dokumentarkivet på vegne av?",
    nn: "Kven vil du bruke dokumentarkivet på vegner av?",
    en: "Which users documents would you like to view?",
  },
  representasjonDescription: {
    nb: "Velg mellom dine representerte for å se dokumentarkivet deres.",
    nn: "Velg mellom dine representerte for å se dokumentarkivet deres.",
    en: "Choose between the people you represent to view their documents.",
  },
  representasjonStandardTekst: {
    nb: "Alle dokumenter som er registrert på ",
    nn: "Alle dokumenter som er registrert på ",
    en: "All documents registered for ",
  },
  representasjonValgtBruker: {
    nb: "Du bruker nå dokumentarkivet på vegne av ",
    nn: "Du brukar no dokumentarkivet på vegner av ",
    en: "You are now viewing the document archive on behalf of ",
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
  sistEndret: {
    nb: "Sist endret",
    nn: "Sist endra",
    en: "Last changed at",
  },
  snarveier: {
    nb: "Snarveier",
    nn: "Snarveier",
    en: "Shortcuts",
  },
  saksbehandlingstider: {
    nb: "Saksbehandlingstider",
    nn: "Saksbehandlingstider",
    en: "Processing times",
  },
  sendKlage: {
    nb: "Send klage på vedtak",
    nn: "Send klage på vedtak",
    en: "Send an appeal against the decision",
  },
  dokumentDisclaimerTittel: {
    nb: "Dokumenter du ikke får åpnet",
    nn: "Dokumenter du ikke får åpnet",
    en: "Not all types of documents are able to be viewed",
  },
  documentDisclaimerListepunktEn: {
    nb: "Papirer du har sendt til NAV i posten. Du vil kunne se tittelen og dato for dokumentet, men ikke innholdet i pdf. Dokumenter du har sendt i papirpost blir skannet og digitalisert. Det er en liten risiko for at det skjer noe feil i skanningen. Vi vil ikke vise deg dokumentet før vi er sikre på at det gjelder deg og din sak",
    nn: "Papirer du har sendt til NAV i posten. Du vil kunne se tittelen og dato for dokumentet, men ikke innholdet i pdf. Dokumenter du har sendt i papirpost blir skannet og digitalisert. Det er en liten risiko for at det skjer noe feil i skanningen. Vi vil ikke vise deg dokumentet før vi er sikre på at det gjelder deg og din sak",
    en: "Documents sent to NAV by mail",
  },
  documentDisclaimerListepunktTo: {
    nb: "Dokumenter som gjelder saken din, men som er sendt av andre på vegne av deg.  Du vil kunne se tittelen og dato for dokumentet, men ikke innholdet i pdf. Slike dokumenter kan for eksempel være en lege, advokat, verge eller fullmektig.",
    nn: "Dokumenter som gjelder saken din, men som er sendt av andre på vegne av deg.  Du vil kunne se tittelen og dato for dokumentet, men ikke innholdet i pdf. Slike dokumenter kan for eksempel være en lege, advokat, verge eller fullmektig.",
    en: "Documents regarding your case, sent by others on your behalf. This could mean that it was sent by a doctor, laywer or legal guardian.",
  },
  landingssideDisclaimerTittel: {
    nb: "Finner du ikke det du leter etter?",
    nn: "Finn du ikkje det du leitar etter?",
    en: "Do you not find what you were looking for?",
  },
  landingssideDisclaimerListepunktEn: {
    nb: "Her viser vi alle dokumenter som er registrert på <innlogget navn/fullmakt>",
    nn: "Her viser vi alle dokumenter som er registrert på <innlogget navn/fullmakt>",
    en: "If you have sent an application by mail it will take some time before it is shown here",
  },
  landingssideDisclaimerListepunktTo: {
    nb: "Vi viser dokumenter i saker nyere enn 2016. For bidragssaker kan du kun se dokumenter fra starten av 2022.",
    nn: "Vi viser dokumenter i saker nyere enn 2016. For bidragssaker kan du kun se dokumenter fra starten av 2022.",
    en: "For contribution matters, we are only able to present documents starting from 2022.",
  },
  landingssideDisclaimerListepunktTre: {
    nb: "Har du søkt om økonomisk sosialhjelp? Da er dokumenter knyttet til digitale søknader tilgjengelige i en ",
    nn: "Har du søkt om økonomisk sosialhjelp? Da er dokumenter knyttet til digitale søknader tilgjengelige i en ",
    en: "For contribution matters, we are only able to present documents starting from 2022.",
  },
  landingssideDisclaimerListepunktTreLenke: {
    nb: "egen løsning",
    nn: "egen løsning",
    en: "For contribution matters, we are only able to present documents starting from 2022.",
  },
  landingssideDisclaimerTekstDel1: {
    nb: "Kontakt oss",
    nn: "Kontakt oss",
    en: "Contact us",
  },
  landingssideDisclaimerTekstDel2: {
    nb: " dersom det er noe du lurer på.",
    nn: " dersom det er noko du lurar på.",
    en: " if you have any questions.",
  },
  ingenSakerTittel: {
    nb: "Ingen saker eller dokumenter å vise",
    nn: "Ingen saker eller dokument å vise",
    en: "No cases or documents to show",
  },
  ingenSakerListeTittel: {
    nb: "Finner du ikke det du leter etter?",
    nn: "Finner du ikke det du leter etter?",
    en: "Can't find what you're looking for?",
  },
  ingenSakerListe1: {
    nb: "Har du sendt inn en søknad per post tar det litt tid før saken vises her. Du kan likevel ettersende dokumenter.",
    nn: "Har du sendt inn ein søknad per post tar det litt tid før saka blir vist her. Du kan likevel ettersende dokument.",
    en: "If you have sent an application by mail it will take some time before it is shown on this page. You can still send additional documentation.",
  },
  ingenSakerListe3: {
    nb: "For bidragssaker kan du kun se dokumenter fra starten av 2022.",
    nn: "For bidragssaker kan du kun se dokumenter fra starten av 2022.",
    en: "For contribution matters, we are only able to present documents starting from 2022.",
  },
  ingenSakerTaKontakt: {
    nb: "Ta kontakt dersom det er noe du lurer på.",
    nn: "Ta kontakt dersom det er noe du lurer på.",
    en: "Contact us if you have any questions.",
  },
  minSideKnapp: {
    nb: "Gå til Min Side",
    nn: "Gå til Mi Side",
    en: "Go to My Page",
  },
  tilbakeKnapp: {
    nb: "Tilbake til forside dokumentarkiv",
    nn: "Tilbake til forside dokumentarkiv",
    en: "Back to document archive front page",
  },
  ingenJournalposter: {
    nb: "Ingen registrerte saker eller dokumenter å vise",
    nn: "Ingen registrerte sakar eller dokument å vise",
    en: "No registered cases or documents to show",
  },
  kanIkkeViseDokument: {
    nb: "Kan ikke vise dokument",
    nn: "Kan ikkje vise dokument",
    en: "Can not show document",
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
  temaLenkeIntro: {
    nb: "For endring og status se ",
    nn: "For endringar og status se ",
    en: "For corrections and status go to ",
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
  dokumentKanIkkeVises: {
    nb: "Dokumentet kan ikke vises",
    nn: "Kan ikkje vise dokument",
    en: "Document can not be viewed",
  },
  vedleggKanIkkeVises: {
    nb: " (kan ikke vises)",
    nn: " (kan ikkje visast)",
    en: " (can not show)",
  },
  detaljerTitle: {
    nb: "Detaljer",
    nn: "Detaljer",
    en: "Details",
  },
  datoTitle: {
    nb: "Dato opprettet",
    nn: "Dato opprettet",
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
  ingenSide404: {
    nb: "Feil: Fant ikke siden",
    nn: "Feil: Fant ikke siden",
    en: "Error: Page not found",
  },
  feilmelding: {
    nb: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
    en: "We're having technical difficulties. Some information may not be available, please try again later.",
    nn: "Vi har for øyeblikket tekniske problemer. Dette kan føre til at du ikke får opp all informasjon. Vennligst prøv igjen senere.",
  },
  filtersTitle: {
    nb: "Velg hvilke dokumenter du vil se",
    nn: "Velg hvilke dokumenter du vil se",
    en: "Choose which category of documents you wish to see",
  }
};
