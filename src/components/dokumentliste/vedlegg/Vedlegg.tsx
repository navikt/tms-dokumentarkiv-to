import type { JournalpostProps } from "../DokumentInterfaces";
import { getLanguage } from "@language/language";
import { text } from "../../../language/text";
import styles from "./Vedlegg.module.css";
import { Label } from "@navikt/ds-react";

const Vedlegg = ({ journalpost }: { journalpost: JournalpostProps }) => {
  const vedleggsListe = journalpost.dokumenter.filter(
    (d) => d.dokumenttype === "VEDLEGG"
  );

  const hasVedlegg = vedleggsListe.length > 0;
  return (
    <>
      {hasVedlegg ? (
        <div className={styles.veddleggsListe}>
          <Label size="small">Vedlegg</Label>
          {vedleggsListe.map((vedlegg) =>
            vedlegg.brukerHarTilgang ? (
              <a className={styles.vedlegg}>{vedlegg.tittel}</a>
            ) : (
              <div className={styles.vedleggIngenTilgang}>
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
