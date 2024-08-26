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
  //TODO: Håndtere tilfeller hvor både avsender og mottaker er satt til null
  const hasRegisteredAvsender = journalpost.avsender != null;
  const hasRegisteredMottaker = journalpost.mottaker != null;
  const avsender = isUtgaaendeDokument ? "NAV" : journalpost.avsender;
  const mottaker = isUtgaaendeDokument
    ? journalpost.mottaker === "Bruker"
      ? "Deg"
      : journalpost.mottaker
    : "NAV";
  return (
    <li className={styles.container} key={journalpost.journalpostId}>
      {hovedDokument[0].brukerHarTilgang ? (
        <Dokument
          dokument={hovedDokument[0]}
          dato={dato}
          avsender={avsender}
          mottaker={mottaker}
          journalpostId={journalpost.journalpostId}
          language={language}
        />
      ) : (
        <DokumentUtenTilgang
          dokument={hovedDokument[0]}
          dato={dato}
          avsender={avsender}
          mottaker={mottaker}
          language={language}
        />
      )}
      <Vedlegg journalpost={journalpost} language={language}/>
    </li>
  );
};

export default Journalpost;
