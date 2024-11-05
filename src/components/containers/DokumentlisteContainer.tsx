import Disclaimer from "@components/disclaimers/disclaimer-dokumentliste/Disclaimer";
import Dokumentliste from "@components/journalpostliste/Journalpostliste";
import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import Filters from "@components/filters/Filters";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { Heading } from "@navikt/ds-react";
import { SWRConfig } from "swr";

interface Props {
  language: Language;
}

const OnePagerContainer = ({ language }: Props) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
        <Heading level="1" size="large">
          {text.dokumentarkiv[language]}
        </Heading>
        <SelectFullmakt language={language}/>
        <Filters />
        <Dokumentliste language={language}/>
        <Disclaimer language={language}/>
        <NyttigOgVite language={language}/>
    </SWRConfig>
  );
};

export default OnePagerContainer;