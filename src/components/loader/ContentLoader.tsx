import { Loader } from "@navikt/ds-react";
import styles from "./ContentLoader.module.css";
import { text } from "../../language/text";

const ContentLoader = () => {
  const language = "nb";

  return (
    <div className={styles.contentLoader}>
      <Loader transparent title={text.lasterInn[language]} size="2xlarge" />
    </div>
  );
};

export default ContentLoader;
