import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort } from "@navikt/ds-react";
import styles from "./IngenJournalposter.module.css";

interface Props {
  language: Language;
}

const IngenJournalposter = ({ language }: Props) => {
  return (
    <div className={styles.container}>
      <BodyShort size="medium">{text.ingenJournalposter[language]}</BodyShort>
    </div>
  );
};

export default IngenJournalposter;
