import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import styles from "./Disclaimer.module.css";
import type { Language } from "@language/language";
import { useStore } from "@nanostores/react";
import { singleJournalpostDisclaimerAtom } from "@store/store";

const Disclaimer = ({ language }: { language: Language }) => {
  const tilgangssperre = useStore(singleJournalpostDisclaimerAtom);

  if (tilgangssperre === null) {
    return null;
  }

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
