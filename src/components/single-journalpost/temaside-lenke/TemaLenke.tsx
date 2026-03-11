import type {Language} from "@language/language";
import {lenker, omsorgspengerKontaktOssUrl} from "./Lenker";
import styles from "./TemaLenke.module.css";
import {text} from "@language/text";
import {logEvent} from "@utils/client/analytics";

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

const TemaLenke = ({lenketekst, temakode, language}: Props) => {
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

  const StandardLenke = () => (
    <span>
      {text.temaLenkeDel1[language]}
      <a
        href={lenker[type]}
        className={styles.lenke}
        onClick={() => logEvent("Lenke", "Temalenke", lenketekst)}
      >
        {lenketekst}
      </a>
      {text.temaLenkeDel2[language]}
    </span>
  );

  const SykAndSymLenke = () => (
    <span>
      {text.temaLenkeDel1[language]}
      <a
        href={lenker[type]}
        className={styles.lenke}
        onClick={() => logEvent("Lenke", "Temalenke", lenketekst)}
      >
        {text.sykOgSymLenke[language]}
      </a>
      {text.temaLenkeDel2[language]}
    </span>
  );

  const OmsLenke = () => (
    <>
      <div className={styles.omsLenke}>
        <span>
          {text.temaLenkeDel1[language]}
          <a
            href={lenker[type]}
            className={styles.lenke}
            onClick={() => logEvent("Lenke", "Temalenke", lenketekst)}
          >
            {lenketekst}
          </a>
          {text.temaLenkeOms[language]}
        </span>
      </div>
      <div>
        <span>
          {text.temaLenkeOmsDel2[language]}
          <a
            href={omsorgspengerKontaktOssUrl}
            className={styles.lenke}
            onClick={() => logEvent("Lenke", "Temalenke", "Kontakt oss")}
          >
            {text.temaLenkeOmsKontakteOss[language]}
          </a>
          .
        </span>
      </div>
    </>
  );

  if (isUnntak) {
    switch (type) {
      case "OMS":
        return <OmsLenke />;
      case "SYK":
        return <SykAndSymLenke />;
      case "SYM":
        return <SykAndSymLenke />;
      default:
        return <StandardLenke />;
    }
  } else {
    return null;
  }
};

export default TemaLenke;
