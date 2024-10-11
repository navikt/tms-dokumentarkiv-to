import Disclaimer from "@components/disclaimers/disclaimer-dokumentliste/Disclaimer";
import Dokumentliste from "@components/dokumentliste/DokumentlisteMedLenketJournalpost";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";
import type { Language } from "@language/language";
import { SWRConfig } from "swr";
import styles from "./DokumentlisteContainer.module.css";

interface Props {
  language: Language;
  temakode: string | undefined;
  journalpostid: string | undefined;
}

const DokumentDirekteLenkeContainer = ({ language, temakode, journalpostid }: Props) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <Dokumentliste language={language} temakode={temakode} journalpostid={journalpostid}/>
      <div className={styles.grayBackground}>
        <Disclaimer language={language}/>
        <NyttigOgVite language={language}/>
      </div>
    </SWRConfig>
  );
};

export default DokumentDirekteLenkeContainer;