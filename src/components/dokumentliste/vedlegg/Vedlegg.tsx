import { Label } from "@navikt/ds-react";
import { text } from "../../../language/text";
import type { JournalpostProps } from "../DokumentInterfaces";
import styles from "./Vedlegg.module.css";

const Vedlegg = ({ journalpost }: { journalpost: JournalpostProps }) => {
  const vedleggsListe = journalpost.dokumenter.filter(
    (d) => d.dokumenttype === "Vedlegg"
  );

  const hasVedlegg = vedleggsListe.length > 0;
  return (
    <>
      {hasVedlegg ? (
        <div className={styles.veddleggsListe}>
          <Label size="small">Vedlegg</Label>
          {vedleggsListe.map((vedlegg) =>
            vedlegg.brukerHarTilgang ? (
              <a className={styles.vedlegg} key={vedlegg.dokumentInfoId}>{vedlegg.tittel}</a>
            ) : (
              <div className={styles.vedleggIngenTilgang} key={vedlegg.dokumentInfoId}>
                {vedlegg.tittel + text.vedleggKanIkkeVises["nb"]}
              </div>
            )
          )}
        </div>
      ) : null}
    </>
  );
};

export default Vedlegg;
