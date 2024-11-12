import { Heading } from "@navikt/ds-react";
import styles from "./NyttigOgVite.module.css";
import { kontaktOssUrl, saksbehandlingstiderUrl, tilbakemeldingerUrl } from "@src/urls.client";
import { text } from "../../language/text";
import { logAmplitudeEvent } from "../../utils/client/amplitude";
import type { Language } from "@language/language";

const NyttigOgVite = ({ language }: { language: Language }) => {

  return(
    <div className={styles.container}>
      <Heading level="2" size="small" className={styles.heading}>{text.nyttigOgVite[language]}</Heading>
      <a href={saksbehandlingstiderUrl} className={styles.lenke} onClick={() => logAmplitudeEvent("Lenke", "Lenkepanel", text.lenke1["nb"])}>{text.lenke1[language]}</a>
      <a href={tilbakemeldingerUrl} className={styles.lenke} onClick={() => logAmplitudeEvent("Lenke", "Lenkepanel", text.lenke2["nb"])}>{text.lenke2[language]}</a>
      <a href={kontaktOssUrl} className={styles.lenke} onClick={() => logAmplitudeEvent("Lenke", "Lenkepanel", text.lenke3["nb"])}>{text.lenke3[language]}</a>
    </div>
  );
};

export default NyttigOgVite;