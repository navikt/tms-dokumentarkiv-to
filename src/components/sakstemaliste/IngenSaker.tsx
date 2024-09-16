import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort } from "@navikt/ds-react";
import styles from "./IngenSaker.module.css";

const IngenSaker = ({ language }: { language: Language }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.background}>
          <BodyShort className={styles.tekst}>
            {text.ingenSakerTittel[language]}
          </BodyShort>
        </div>
      </div>
    </div>
  );
};

export default IngenSaker;
