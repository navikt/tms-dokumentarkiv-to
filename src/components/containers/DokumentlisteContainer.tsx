import Disclaimer from "@components/disclaimers/disclaimer-dokumentliste/Disclaimer";
import Dokumentliste from "@components/dokumentliste/Dokumentliste";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";
import type { Language } from "@language/language";
import { SWRConfig } from "swr";
import styles from "./DokumentlisteContainer.module.css";

interface Props {
  language: Language;
  temakode: string | undefined;
}

const DokumentlisteContainer = ({ language, temakode }: Props) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <Dokumentliste language={language} temakode={temakode}/>
      <div className={styles.grayBackground}>
        <Disclaimer language={language}/>
        <NyttigOgVite language={language}/>
      </div>
    </SWRConfig>
  );
};

export default DokumentlisteContainer;
