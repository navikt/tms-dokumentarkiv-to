import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail, BodyShort } from "@navikt/ds-react";
import { FilePdfIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";
import type { Language } from "@language/language";
import { dokumentUrl } from "@src/urls.client";
import { readableFileSize } from "@utils/readableFilesize";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsenderText: string;
  journalpostId: string;
  language: Language;
}

const Dokument = ({ dokument, dato, avsenderText, journalpostId, language }: Props) => {
  const url = `${dokumentUrl}/${journalpostId}/${dokument.dokumentInfoId}`;
  return (
    <div
      className={`${styles.container} ${styles.hover}`}
      key={dokument.dokumentInfoId}
    >
      <div className={styles.icon}>
        <FilePdfIcon fontSize="2rem" />
      </div>
      <div className={styles.content}>  
        <BodyShort size="small">{dato + " - " + avsenderText}</BodyShort>
        <a className={styles.link} href={url}>
          <BodyShort size="medium">
            {dokument.tittel}
          </BodyShort>
        </a>
        <BodyShort size="small">{readableFileSize(dokument.filstorrelse)}</BodyShort>
      </div>
    </div>
  );
};

export default Dokument;
