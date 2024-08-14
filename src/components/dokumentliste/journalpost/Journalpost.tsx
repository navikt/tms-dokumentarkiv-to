import { format } from "date-fns";
import Dokument from "../dokument/Dokument";
import DokumentUtenTilgang from "../dokument/DokumentUtenTilgang";
import type { JournalpostProps } from "../DokumentInterfaces";
import Vedlegg from "../vedlegg/Vedlegg";
import styles from "./Journalpost.module.css";

const Journalpost = ({ journalpost }: { journalpost: JournalpostProps }) => {
  const hovedDokument = journalpost.dokumenter.filter(
    (d) => d.dokumenttype === "Hoved"
  );
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const isUtgaaendeDokument = journalpost.journalposttype === "Ut";
  const avsender = isUtgaaendeDokument ? "NAV" : journalpost.avsender;
  const mottaker = isUtgaaendeDokument
    ? journalpost.mottaker === "Bruker"
      ? "Deg"
      : journalpost.mottaker
    : "NAV";
  return (
    <>
      <li className={styles.container} key={journalpost.journalpostId}>
        {hovedDokument[0].brukerHarTilgang ? (
          <Dokument
            dokument={hovedDokument[0]}
            dato={dato}
            avsender={avsender}
            mottaker={mottaker}
          />
        ) : (
          <DokumentUtenTilgang
            dokument={hovedDokument[0]}
            dato={dato}
            avsender={avsender}
            mottaker={mottaker}
          />
        )}
        <Vedlegg journalpost={journalpost} />
      </li>
    </>
  );
};

export default Journalpost;
