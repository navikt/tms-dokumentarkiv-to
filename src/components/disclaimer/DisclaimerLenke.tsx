import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyLong } from "@navikt/ds-react";
import { kontaktOssUrl } from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/amplitude";

const DisclaimerLenke = ({language}: {language: Language}) => {
  return (
    <BodyLong>
      <span>
        <a
          href={kontaktOssUrl}
          onClick={() =>
            logAmplitudeEvent(
              "Lenke",
              "Disclaimer",
              text.landingssideDisclaimerTekstDel1[language]
            )
          }
        >
          {text.landingssideDisclaimerTekstDel1[language]}
        </a>
      </span>
      {text.landingssideDisclaimerTekstDel2[language]}
    </BodyLong>
  );
};

export default DisclaimerLenke;