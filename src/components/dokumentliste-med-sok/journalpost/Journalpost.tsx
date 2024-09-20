import type { Language } from "@language/language";
import { setAvsenderMottaker } from "@utils/client/setAvsenderMottaker";
import { format } from "date-fns";
import Dokument from "../dokument/Dokument";
import DokumentUtenTilgang from "../dokument/DokumentUtenTilgang";
import type { JournalpostProps } from "../DokumentInterfaces";
import Vedlegg from "../vedlegg/Vedlegg";
import styles from "./Journalpost.module.css";

interface Props {
  journalpost: JournalpostProps;
  language: Language;
}

const Journalpost = ({ journalpost, language }: Props) => {
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const avsenderText = setAvsenderMottaker(journalpost, language);
  
  return (
    <li className={styles.container} key={journalpost.journalpostId}>
      {journalpost.dokument.brukerHarTilgang ? (
        <Dokument
          dokument={journalpost.dokument}
          dato={dato}
          avsenderText={avsenderText}
          journalpostId={journalpost.journalpostId}
          language={language}
        />
      ) : (
        <DokumentUtenTilgang
          dokument={journalpost.dokument}
          dato={dato}
          avsenderText={avsenderText}
          language={language}
        />
      )}
      <Vedlegg vedleggsListe={journalpost.vedlegg} journalpostId={journalpost.journalpostId} language={language}/>
    </li>
  );
};

export default Journalpost;
