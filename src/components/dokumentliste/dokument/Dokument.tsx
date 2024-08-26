import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail } from "@navikt/ds-react";
import { FilePdfIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";
import type { Language } from "@language/language";
import { dokumentUrl } from "@src/urls.client";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsender: string;
  mottaker: string;
  journalpostId: string;
  language: Language;
}

const Dokument = ({ dokument, dato, avsender, mottaker, journalpostId, language }: Props) => {
  const url = `${dokumentUrl}/${journalpostId}/${dokument.dokumentInfoId}`;
  return (
    <a
      className={`${styles.container} ${styles.hover}`}
      href={url}
      key={dokument.dokumentInfoId}
    >
      <div className={styles.icon}>
        <FilePdfIcon fontSize="2rem" />
      </div>
      <div className={styles.content}>
        <Heading level="3" size="xsmall" className={styles.tittel}>
          {dokument.tittel}
        </Heading>
        <div className={styles.detail}>
          <Detail>{dato}</Detail>
          <Detail>{"Avsender: " + avsender}</Detail>
          <Detail>{"Mottaker: " + mottaker}</Detail>
        </div>
      </div>
    </a>
  );
};

export default Dokument;
