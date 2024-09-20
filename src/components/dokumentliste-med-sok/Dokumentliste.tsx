import ContentLoader from "@components/loader/ContentLoader";
import { getAlleJournalposterUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import { Heading } from "@navikt/ds-react";
import { text } from "@language/text";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";
import type { Language } from "@language/language";
import SelectFullmakt from "./representasjon/SelectFullmakt";

interface Props {
  language: Language;
}

const Dokumentliste = ({ language }: Props) => {
  const { data: journalposter, isLoading } = useSWRImmutable<
    JournalpostProps[]
  >(getAlleJournalposterUrl, fetcher);

  if (isLoading) {
    return null;
  }

  const antallDokumenter = 4;

  return (
    <>
      {journalposter && (
        <div className={styles.container}>
          <div>
            <div className={styles.contentWrapper}>
              <Heading level="3" size="xsmall" className={styles.heading}>
                {text.viserAntallDokumenter[language](4, 8)}
              </Heading>
              {isLoading ? (
                <ContentLoader language={language} />
              ) : (
                <ul className={styles.list}>
                  {journalposter?.map((journalpost: JournalpostProps) => {
                    return (
                      <Journalpost
                        journalpost={journalpost}
                        language={language}
                      />
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dokumentliste;
