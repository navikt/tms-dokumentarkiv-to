import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import { kontaktOssUrl } from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/amplitude";
import styles from "./Disclaimer.module.css";
import type { Language } from "@language/language";

const Disclaimer = ({ language }: { language: Language }) => {

  return (
    <div className={styles.container}>
      <Heading level="2" size="small">
        {text.landingssideDisclaimerTittel[language]}
      </Heading>
      <ul>
        <li>
          <BodyLong>
            {text.landingssideDisclaimerListepunktEn[language]}
          </BodyLong>
        </li>
        <li>
          <BodyLong>
            {text.landingssideDisclaimerListepunktTo[language]}
          </BodyLong>
        </li>
      </ul>
      <BodyLong>
        <span>
          <a
            href={kontaktOssUrl}
            onClick={() =>
              logAmplitudeEvent(
                "Lenke",
                "Disclaimer",
                text.landingssideDisclaimerTekstDel1["nb"]
              )
            }
          >
            {text.landingssideDisclaimerTekstDel1[language]}
          </a>
        </span>
        {text.landingssideDisclaimerTekstDel2[language]}
      </BodyLong>
    </div>
  );
};

export default Disclaimer;
