import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort } from "@navikt/ds-react";
import styles from "./DokumentNotFound.module.css";

interface Props {
  language: Language;
}

const DokumentNotFound = ({ language }: Props) => {
  return (
    <div className={styles.container}>
      <BodyShort size="medium">{text.finnerIkkeDokument[language]}</BodyShort>
    </div>
  );
};

export default DokumentNotFound;
