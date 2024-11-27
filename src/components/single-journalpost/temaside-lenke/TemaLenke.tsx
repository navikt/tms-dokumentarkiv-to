import type { Language } from "@language/language";
import { lenker } from "./Lenker";
import styles from "./TemaLenke.module.css";
import { text } from "@language/text";
import { logAmplitudeEvent } from "@utils/client/amplitude";

export type Temakode =
  | "DAG"
  | "HJE"
  | "FOR"
  | "KOM"
  | "AAP"
  | "SYK"
  | "SYM"
  | "PEN"
  | "UFO"
  | "OMS";

interface Props {
  lenketekst: string | undefined;
  temakode: string | undefined;
  language: Language;
}

const TemaLenke = ({ lenketekst, temakode, language }: Props) => {
  const type = temakode as Temakode;

  const unntaksKoder = [
    "DAG",
    "HJE",
    "FOR",
    "KOM",
    "AAP",
    "SYK",
    "SYM",
    "PEN",
    "UFO",
    "OMS",
  ];
  const isUnntak = unntaksKoder.includes(type);
  const isSykOrSym = type === "SYM" || type === "SYK";

  if (isUnntak) {
    return (
        <span>
          {text.temaLenkeDel1[language]}
          <a
            href={lenker[type]}
            className={styles.lenke}
            onClick={() => logAmplitudeEvent("Lenke", "Temalenke", lenketekst)}
          >
            {isSykOrSym ? text.sykOgSymLenke[language] : lenketekst}
          </a>
          {text.temaLenkeDel2[language]}
        </span>
    );
  } else {
    return null;
  }
};

export default TemaLenke;
