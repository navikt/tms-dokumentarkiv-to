export interface JournalpostProps {
  journalpostId: string;
  temakode: string,
  navn: string,
  tittel: string;
  avsender: string;
  mottaker: string;
  avsendertype: string,
  opprettet: string;
  dokument: DokumentProps;
  vedlegg: DokumentProps[];
}

export interface DokumentProps {
  dokumentInfoId: string;
  tittel: string;
  filtype: string;
  filstorrelse: number; 
  brukerHarTilgang: boolean;
}

export interface JournalposterProps {
  temakode: string;
  navn: string;
  journalposter: JournalpostProps[];
}