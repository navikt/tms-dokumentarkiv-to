export interface JournalpostProps {
  journalpostId: string;
  tittel: string;
  avsender: string;
  mottaker: string;
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