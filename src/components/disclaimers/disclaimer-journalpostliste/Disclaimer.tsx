import { text } from "@language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import { kontaktOssUrl } from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/client/amplitude";
import styles from "./Disclaimer.module.css";
import type { Language } from "@language/language";
import { useStore } from "@nanostores/react";
import { sakstemaerAtom } from "@store/store";

const Disclaimer = ({ language }: { language: Language }) => {
  const sakstemaer = useStore(sakstemaerAtom);
  const hasBidrag = sakstemaer.filter(
    (sakstema) => sakstema.temanavn === "Bidrag"
  );

  console.log(hasBidrag);

  return (
    <div className={styles.container}>
      <Heading level="2" size="small">
        {text.landingssideDisclaimerTittel[language]}
      </Heading>
      <ul>
        {hasBidrag.length > 0 && (
          <li>
            <BodyLong>
              {text.landingssideDisclaimerListepunktTo[language]}
            </BodyLong>
          </li>
        )}
        <li>
          <BodyLong>
            {text.landingssideDisclaimerListepunktTre[language]}
            <a href="">
              {text.landingssideDisclaimerListepunktTreLenke[language]}
            </a>
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
