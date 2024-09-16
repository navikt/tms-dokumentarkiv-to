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
  filstorrelse: number; 
  brukerHarTilgang: boolean;
  sladdet: boolean;
}

export interface JournalposterProps {
  temakode: string;
  temanavn: string;
  journalposter: Array<JournalpostProps>;
}
