import { Loader } from "@navikt/ds-react";
import styles from "./ContentLoader.module.css";
import { text } from "../../language/text";
import type { Language } from "@language/language";

const ContentLoader = ({ language }: { language: Language }) => {

  return (
    <div className={styles.contentLoader}>
      <Loader transparent title={text.lasterInn[language]} size="2xlarge" />
    </div>
  );
};

export default ContentLoader;
