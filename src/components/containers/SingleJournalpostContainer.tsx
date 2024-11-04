import Disclaimer from "@components/disclaimers/disclaimer-single-journalpost/Disclaimer";
import Dokumentliste from "@components/dokumentliste/Dokumentliste";
import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import Filters from "@components/filters/Filters";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { Heading } from "@navikt/ds-react";
import { SWRConfig } from "swr";
import SingleJournalpost from "@components/single-journalpost/SingleJournalpost";

interface Props {
  language: Language;
  journalpostId: string | undefined;
}

const SingleJournalpostContainer = ({ language, journalpostId }: Props) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
        <SingleJournalpost language={language} journalpostId={journalpostId}/>
        <Disclaimer language={language}/>
    </SWRConfig>
  );
};

export default SingleJournalpostContainer;