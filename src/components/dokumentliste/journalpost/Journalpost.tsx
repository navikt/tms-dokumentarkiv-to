import { format } from "date-fns";
import Dokument from "../dokument/Dokument";
import DokumentUtenTilgang from "../dokument/DokumentUtenTilgang";
import type { JournalpostProps } from "../DokumentInterfaces";
import Vedlegg from "../vedlegg/Vedlegg";
import styles from "./Journalpost.module.css";
import type { Language } from "@language/language";

interface Props {
  journalpost: JournalpostProps;
  language: Language;
}

const Journalpost = ({ journalpost, language }: Props) => {
  //TODO: Inngående/utgående dokument
  const hovedDokument = journalpost.dokumenter.filter(
    (d) => d.dokumenttype === "Hoved"
  );
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const isUtgaaendeDokument = journalpost.journalposttype === "Ut";
  
  return (
    <li className={styles.container} key={journalpost.journalpostId}>
      {hovedDokument[0].brukerHarTilgang ? (
        <Dokument
          dokument={hovedDokument[0]}
          dato={dato}
          avsender={journalpost.avsender}
          mottaker={journalpost.mottaker}
          journalpostId={journalpost.journalpostId}
          language={language}
        />
      ) : (
        <DokumentUtenTilgang
          dokument={hovedDokument[0]}
          dato={dato}
          avsender={journalpost.avsender}
          mottaker={journalpost.mottaker}
          language={language}
        />
      )}
      <Vedlegg journalpost={journalpost} language={language}/>
    </li>
  );
};

export default Journalpost;
