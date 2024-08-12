import { Detail } from "@navikt/ds-react";
import { format } from "date-fns";
import { FilePdfIcon } from "@navikt/aksel-icons";
import type { JournalpostProps } from "../DokumentInterfaces";
import styles from "./Journalpost.module.css";
import DokumentUtenTilgang from "../dokument/DokumentUtenTilgang";
import Dokument from "../dokument/Dokument";
import Vedlegg from "../vedlegg/Vedlegg";

const Journalpost = ({ journalpost }: { journalpost: JournalpostProps }) => {
  const hovedDokument = journalpost.dokumenter.filter(
    (d) => d.dokumenttype === "HOVED"
  );
  const dato = format(new Date(journalpost.sisteEndret), "dd.MM.yyyy");
  const avsender = journalpost.avsender;
  return (
    <>
      <li className={styles.container}>
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
