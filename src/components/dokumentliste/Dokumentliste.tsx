import ContentLoader from "@components/loader/ContentLoader";
import { getJournalposterUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import { Heading } from "@navikt/ds-react";
import { text } from "@language/text";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";

const Dokumentliste = () => {
  const { data: journalposter, isLoading } = useSWRImmutable<JournalpostProps[]>(getJournalposterUrl, fetcher);
  const language = "nb";

  return (
    <div className={styles.container}>
      <Heading level="2" size="medium" className={styles.heading}>
        {text.dokumentListeTittel[language]}
      </Heading>
      {isLoading ? (
        <ContentLoader />
      ) : (
        <ul className={styles.list}>
          {journalposter?.map((journalpost: JournalpostProps) => {
            return <Journalpost journalpost={journalpost} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default Dokumentliste;
