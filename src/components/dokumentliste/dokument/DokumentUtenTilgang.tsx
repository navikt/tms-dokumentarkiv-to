import type { DokumentProps } from "../DokumentInterfaces";
import { Heading, Detail } from "@navikt/ds-react";
import { EyeSlashIcon } from "@navikt/aksel-icons";
import styles from "./Dokument.module.css";

interface Props {
  dokument: DokumentProps;
  dato: string;
  avsender: string;
  mottaker: string;
}

const DokumentUtenTilgang = ({ dokument, dato, avsender, mottaker }: Props) => {
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
          <Detail>{"Avsender: " + avsender}</Detail>
          <Detail>{"Mottaker: " + mottaker}</Detail>
        </div>
        <Detail className={styles.utilgjengelig}>Dokument utilgjengelig</Detail>
      </div>
    </div>
  );
};

export default DokumentUtenTilgang;