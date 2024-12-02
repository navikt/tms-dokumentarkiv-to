import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import { digisosUrl, kontaktOssUrl } from "@src/urls.client";
import { logEvent } from "@utils/client/amplitude";
import styles from "./Disclaimer.module.css";
import type { Language } from "@language/language";
import { useStore } from "@nanostores/react";
import { sakstemaerAtom } from "@store/store";

const Disclaimer = ({ language }: { language: Language }) => {

  return (
    <div className={styles.container}>
      <Heading level="2" size="small">
        {text.landingssideDisclaimerTittel[language]}
      </Heading>
      <ul className={styles.list}>
      <li>
          <BodyLong>
            {text.sosialhjelpTekst[language]}
            <a href={digisosUrl}>
              {text.sosialhjelpLenketekst[language]}
            </a>
          </BodyLong>
        </li>
        <li>
          <BodyLong>
            {text.landingssideDisclaimerListepunktTo[language]}
          </BodyLong>
        </li>
      </ul>
    </div>
  );
};

export default Disclaimer;
