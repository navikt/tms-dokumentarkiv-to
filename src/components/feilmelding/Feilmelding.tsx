import { Alert } from "@navikt/ds-react";
import { useStore } from "@nanostores/react";
import { isErrorAtom } from "@store/store.ts";
import type { Language } from "@language/language.ts";
import styles from "./Feilmelding.module.css";
import { text } from "@language/text.ts";

interface Props {
  language: Language;
}

const FeilMelding = ({ language }: Props) => {
  const isError = useStore(isErrorAtom);

  if (isError) {
    return (
      <Alert variant="error" className={styles["feilmelding"]}>
        {text.feilmelding[language]}
      </Alert>
    );
  }

  return null;
};

export default FeilMelding;