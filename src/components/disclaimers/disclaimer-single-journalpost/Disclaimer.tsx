import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import styles from "./Disclaimer.module.css";
import type { Language } from "@language/language";

const Disclaimer = ({ language }: { language: Language }) => {
  return (
    <div className={styles.container}>
      <Heading level="2" size="small">
        {text.dokumentDisclaimerTittel[language]}
      </Heading>
      <ul className={styles.liste}>
        <li>
          <BodyLong>{text.documentDisclaimerListepunktEn[language]}</BodyLong>
        </li>
        <li>
          <BodyLong>{text.documentDisclaimerListepunktTo[language]}</BodyLong>
        </li>
      </ul>
    </div>
  );
};

export default Disclaimer;
