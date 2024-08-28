export interface JournalpostProps {
  journalpostId: string;
  tittel: string;
  journalposttype: string;
  journalstatus: string;
  avsendertype: string;
  avsendernavn: string;
  mottakertype: string;
  mottakernavn: string;
  opprettet: string;
  dokumenter: [DokumentProps];
}

export interface DokumentProps {
  dokumentInfoId: string;
  tittel: string;
  dokumenttype: string;
  filtype: string;
  filstorrelse: string; 
  brukerHarTilgang: boolean;
  sladdet: boolean;
}

export interface JournalposterProps {
  kode: string;
  navn: string;
  journalposter: Array<JournalpostProps>;
}
