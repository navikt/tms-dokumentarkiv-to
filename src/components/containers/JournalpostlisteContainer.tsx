import Disclaimer from "@components/disclaimers/disclaimer-journalpostliste/Disclaimer";
import Filters from "@components/filters/Filters";
import Journalpostliste from "@components/journalpostliste/Journalpostliste";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";
import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { Heading } from "@navikt/ds-react";
import { useState } from "react";
import { SWRConfig } from "swr";

interface Props {
  language: Language;
}

const JournalpostlisteContainer = ({ language }: Props) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <Heading level="1" size="large">
        {text.dokumentarkiv[language]}
      </Heading>
      <SelectFullmakt language={language} />
      {showFilters ? <Filters /> : null}
      <Journalpostliste setShowFilters={setShowFilters} language={language} />
      <Disclaimer language={language} />
      <NyttigOgVite language={language} />
    </SWRConfig>
  );
};

export default JournalpostlisteContainer;
