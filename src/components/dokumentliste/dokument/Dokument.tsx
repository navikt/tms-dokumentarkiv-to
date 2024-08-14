import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail } from "@navikt/ds-react";
import { FilePdfIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsender: string;
  mottaker: string;
}

const Dokument = ({ dokument, dato, avsender, mottaker }: Props) => {
  return (
    <a
      className={`${styles.container} ${styles.hover}`}
      href="#"
      key={dokument.dokumentInfoId}
    >
      <FilePdfIcon fontSize="2rem" />
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
