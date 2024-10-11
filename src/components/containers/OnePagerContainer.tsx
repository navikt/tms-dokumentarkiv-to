import Disclaimer from "@components/disclaimers/disclaimer-dokumentliste/Disclaimer";
import Dokumentliste from "@components/dokumentliste/DokumentlisteMedFiltrering";
import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import SearchAndFilter from "@components/search-and-filter/SearchAndFilter";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { Heading } from "@navikt/ds-react";
import { SWRConfig } from "swr";
import styles from "./OnePagerContainer.module.css";

interface Props {
  language: Language;
}

const OnePagerContainer = ({ language }: Props) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <div className={styles.whiteBackground}>
        <Heading level="1" size="large">
          {text.dokumentarkiv[language]}
        </Heading>
        <SelectFullmakt language={language}/>
        <SearchAndFilter />
      </div>
      <div className={styles.grayBackground}>
        <Dokumentliste language={language}/>
        <Disclaimer language={language}/>
        <NyttigOgVite language={language}/>
      </div>
    </SWRConfig>
  );
};

export default OnePagerContainer;