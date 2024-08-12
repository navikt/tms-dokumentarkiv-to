import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail } from "@navikt/ds-react";
import { EyeSlashIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsender: string;
}

const DokumentUtenTilgang = ({ dokument, dato, avsender }: Props) => {
  return (
    <div className={`${styles.container} ${styles.hover}`} key={dokument.dokumentInfoId}>
      <div className={styles.icon}>
        <EyeSlashIcon fontSize="2rem" />
      </div>
      <div className={styles.content}>
        <Heading level="3" size="xsmall" className={styles.tittelIkkeTilgang}>
          {dokument.tittel}
        </Heading>
        <div className={styles.datoOgAvsender}>
          <Detail>{dato}</Detail>
          <Detail>{"Avsender: " + avsender}</Detail>
          <Detail>Dokument utilgjengelig</Detail>
        </div>
      </div>
    </div>
  );
};

export default DokumentUtenTilgang;