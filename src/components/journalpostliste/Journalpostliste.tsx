import ContentLoader from "@components/loader/ContentLoader";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { useStore } from "@nanostores/react";
import { BodyShort, Select } from "@navikt/ds-react";
import { getAlleJournalposterUrl } from "@src/urls.client";
import {
  filtersAtom,
  filteredJournalposter,
  setJournalposter,
  setSakstemaer,
  sakstemaFiltersAtom,
  sortingOrderAtom,
  setSortingOrder
} from "@store/store";
import { fetcher } from "@utils/client/api";
import { useEffect, useState, type ChangeEvent } from "react";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./JournalpostInterfaces";
import styles from "./Journalpostliste.module.css";
import Journalpost from "./journalpost/Journalpost";

interface Props {
  language: Language;
}

const Journalpostliste = ({ language }: Props) => {
  const { data: journalposter, isLoading } = useSWRImmutable<
    JournalpostProps[]
  >(getAlleJournalposterUrl, fetcher);

  const filters = useStore(filtersAtom)
  const sakstemaFilters = useStore(sakstemaFiltersAtom)
  const order = useStore(sortingOrderAtom)

  useEffect(() => {
    if(journalposter)
    setSakstemaer(journalposter);
  }, [journalposter])
  
  if (journalposter) {
    setJournalposter(journalposter);
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortingOrder(event.target.value.toString());
  };
  
  const filteredList = filteredJournalposter({ order, filters, sakstemaFilters });
  const numberOfDocuments = journalposter?.length;
  const numberOfShownDocuments = filteredList.length;

  return (
    <>
      {journalposter && (
        <div className={styles.container}>
          <div>
            <div className={styles.contentWrapper}>
              {isLoading ? (
                <ContentLoader language={language} />
              ) : (
                <>
                  <div className={styles.dokumentlisteInfo}>
                    <BodyShort size="small" className={styles.text}>
                      {numberOfDocuments &&
                        text.viserAntallDokumenter[language](
                          numberOfShownDocuments,
                          numberOfDocuments
                        )}
                    </BodyShort>
                    <Select
                      label="Sorteringsrekkefølge etter dato"
                      size="small"
                      hideLabel
                      onChange={handleSelectChange}
                    >
                      <option value="asc">Nyeste først</option>
                      <option value="desc">Eldste først</option>
                    </Select>
                  </div>
                  <ul className={styles.list} key="journalpostliste">
                    {filteredList?.map((journalpost: JournalpostProps) => {
                      return (
                        <Journalpost
                          journalpost={journalpost}
                          language={language}
                          key={journalpost.journalpostId}
                        />
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Journalpostliste;
