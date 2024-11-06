import { text } from '@language/text';
import type { Language } from './../../language/language';
import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";

export const setAvsenderMottaker = (journalpost: JournalpostProps, language: Language) => {
  if(!journalpost.avsender) {
    return journalpost.mottaker;
  } else {
    return journalpost.avsender;
  }
}