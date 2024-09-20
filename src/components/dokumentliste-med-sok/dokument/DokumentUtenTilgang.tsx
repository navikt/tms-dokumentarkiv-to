import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail, BodyShort } from "@navikt/ds-react";
import { EyeSlashIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";
import { text } from "@language/text";
import type { Language } from "@language/language";
import { readableFileSize } from "@utils/readableFilesize";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsenderText: string;
  language: Language;
}

const DokumentUtenTilgang = ({ dokument, dato, avsenderText, language }: Props) => {
  return (
    <div className={`${styles.container} ${styles.hover}`} key={dokument.dokumentInfoId}>
      <div className={styles.icon}>
        <EyeSlashIcon fontSize="2rem" />
      </div>
      <div className={styles.content}>
        <Heading level="3" size="xsmall" className={styles.tittelIkkeTilgang}>
          {dokument.tittel}
        </Heading>
        <div className={styles.detail}>
          <Detail>{dato}</Detail>
          <Detail>{avsenderText}</Detail>
          <Detail>{readableFileSize(dokument.filstorrelse)}</Detail>
        </div>
        <BodyShort size="small" className={styles.dokumentKanIkkeVises}>
          {text.dokumentKanIkkeVises[language]}
        </BodyShort>
      </div>
    </div>
  );
};

export default DokumentUtenTilgang;