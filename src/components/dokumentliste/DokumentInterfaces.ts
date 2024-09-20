export interface JournalpostProps {
  journalpostId: string;
  tittel: string;
  avsendernavn: string;
  mottakernavn: string;
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
  temanavn: string;
  journalposter: JournalpostProps[];
}