import { BodyShort } from "@navikt/ds-react";
import { text } from "@language/text";
import styles from "./IngenSaker.module.css";
import { representantSelected } from "@store/store";
import type { Language } from "@language/language";

const IngenSaker = ({ language }: { language: Language }) => {

  const isRepresentantSelected = true//representantSelected.get();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.background}>
          <BodyShort className={styles.tekst}>
            {isRepresentantSelected ? text.representantIngenSakerTittel[language] : text.ingenSakerTittel[language]}
          </BodyShort>
        </div>
      </div>
    </div>
  );
};

export default IngenSaker;
