import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail } from "@navikt/ds-react";
import { FilePdfIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsender: string;
}

const Dokument = ({ dokument, dato, avsender }: Props) => {
  return (
    <>
      <a className={`${styles.container} ${styles.hover}`} href="#">
        <FilePdfIcon fontSize="2rem" />
        <div className={styles.content}>
          <Heading level="3" size="xsmall" className={styles.tittel}>
            {dokument.tittel}
          </Heading>
          <div className={styles.datoOgAvsender}>
            <Detail>{dato}</Detail>
            <Detail>{"Avsender: " + avsender}</Detail>
          </div>
        </div>
      </a>
    </>
  );
};

export default Dokument;
