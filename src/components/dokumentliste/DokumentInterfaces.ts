export interface JournalpostProps {
  journalpostId: string;
  tittel: string;
  journalposttype: string;
  journalstatus: string;
  temakode: string;
  temanavn: string;
  avsendertype: string;
  avsender: string;
  mottakertype: string;
  mottaker: string;
  opprettet: string;
  dokumenter: [DokumentProps];
}

export interface DokumentProps {  
  dokumentInfoId: string;
  tittel: string;
  dokumenttype: string;  
  filtype: string;
  brukerHarTilgang: boolean;
}

