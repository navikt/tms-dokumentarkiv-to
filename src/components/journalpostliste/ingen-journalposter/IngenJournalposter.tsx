import type { Language } from "@language/language";
import styles from "./IngenJournalposter.module.css"
import { BodyShort } from "@navikt/ds-react";
import { text } from "@language/text";

interface Props {
  language: Language;
}

const IngenJournalposter = ({ language }: Props) => {
  return(
    <div className={styles.container}>
      <BodyShort size="medium">{text.ingenJournalposter[language]}</BodyShort>
    </div>
  )
}

export default IngenJournalposter;