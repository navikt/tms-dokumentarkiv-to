import { text } from '@language/text';
import type { Language } from './../../language/language';
import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";

export const setAvsenderMottaker = (journalpost: JournalpostProps, language: Language) => {
  if(!journalpost.avsender) {
    return text.sendtTil[language](journalpost.mottaker);
  } else {
    return text.sendtAv[language](journalpost.avsender);
  }
}