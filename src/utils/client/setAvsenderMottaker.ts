import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";

export const setAvsenderMottaker = (journalpost: JournalpostProps) => {
  if(!journalpost.avsender) {
    return journalpost.mottaker;
  } else {
    return journalpost.avsender;
  }
}