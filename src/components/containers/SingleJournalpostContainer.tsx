import Disclaimer from "@components/disclaimers/disclaimer-single-journalpost/Disclaimer";
import SingleJournalpost from "@components/single-journalpost/SingleJournalpost";
import type { Language } from "@language/language";
import { SWRConfig } from "swr";

interface Props {
  language: Language;
  journalpostId: string | undefined;
}

const SingleJournalpostContainer = ({ language, journalpostId }: Props) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <SingleJournalpost language={language} journalpostId={journalpostId} />
      <Disclaimer language={language} />
    </SWRConfig>
  );
};

export default SingleJournalpostContainer;
