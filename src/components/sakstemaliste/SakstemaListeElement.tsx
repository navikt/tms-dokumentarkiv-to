import { BodyLong, Heading } from "@navikt/ds-react";
import { format } from "date-fns";
import { text } from "../../language/text";
import type { SakstemaElement } from "./SakstemaListe";
import styles from "./SakstemaListeElement.module.css";
import { digisosRedirectUrl } from "@src/urls.client";
import { logAmplitudeEvent } from "../../utils/amplitude";
import type { Language } from "@language/language";

interface Props {
  sakstema: SakstemaElement
  language: Language
}

const SakstemaListeElement = ({ sakstema, language }: Props) => {

  const isDigisosRedirect = sakstema.kode === "KOM";
  const url = isDigisosRedirect ? digisosRedirectUrl : `/dokumentarkiv-to/tema/${sakstema.kode}`;

  return (
    <li className={styles.container} key={Math.random.toString()}>
      <a
        href={url}
        className={styles.lenke}
        onClick={() => logAmplitudeEvent("Sakstemalenke", "Sakstemaliste", sakstema.navn)}
      >
        <Heading level="3" size="small" className={styles.tittel}>
          {sakstema.navn}
        </Heading>
        <BodyLong className={styles.ingress}>{`${text.sistEndret[language]} ${format(
          new Date(sakstema.sistEndret),
          "dd.MM.yyyy",
        )}`}</BodyLong>
      </a>
    </li>
  );
};

export default SakstemaListeElement;
