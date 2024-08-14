import { format } from "date-fns";
import Dokument from "../dokument/Dokument";
import DokumentUtenTilgang from "../dokument/DokumentUtenTilgang";
import type { JournalpostProps } from "../DokumentInterfaces";
import Vedlegg from "../vedlegg/Vedlegg";
import styles from "./Journalpost.module.css";

const Journalpost = ({ journalpost }: { journalpost: JournalpostProps }) => {
  const hovedDokument = journalpost.dokumenter.filter(
    (d) => d.dokumenttype === "HOVED"
  );
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const avsender = journalpost.avsender;
  return (
    <>
      <li className={styles.container} key={journalpost.journalpostId}>
        {hovedDokument[0].brukerHarTilgang ? (
          <Dokument
            dokument={hovedDokument[0]}
            dato={dato}
            avsender={avsender}
          />
        ) : (
          <DokumentUtenTilgang
            dokument={hovedDokument[0]}
            dato={dato}
            avsender={avsender}
          />
        )}
        <Vedlegg journalpost={journalpost} />
      </li>
    </>
  );
};

export default Journalpost;
