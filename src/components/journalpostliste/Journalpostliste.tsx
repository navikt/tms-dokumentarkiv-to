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
  setSortingOrder,
} from "@store/store";
import { fetcher } from "@utils/client/api";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./JournalpostInterfaces";
import styles from "./Journalpostliste.module.css";
import Journalpost from "./journalpost/Journalpost";
import IngenJournalposter from "./ingen-journalposter/IngenJournalposter";

interface Props {
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  language: Language;
}

const Journalpostliste = ({ language, setShowFilters }: Props) => {
  const { data: journalposter, isLoading } = useSWRImmutable<
    JournalpostProps[]
  >(getAlleJournalposterUrl, fetcher);

  useEffect(() => {
    if (journalposter) setSakstemaer(journalposter);
  }, [journalposter]);

  useEffect(() => {
    if (journalposter) {
      hasJournalposter && numberOfDocuments > 3
        ? setShowFilters(true)
        : setShowFilters(false);
    }
  }, [journalposter]);

  const filters = useStore(filtersAtom);
  const sakstemaFilters = useStore(sakstemaFiltersAtom);
  const order = useStore(sortingOrderAtom);

  if (journalposter) {
    setJournalposter(journalposter);
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortingOrder(event.target.value.toString());
  };

  const filteredList = filteredJournalposter({
    order,
    filters,
    sakstemaFilters,
  });
  
  const numberOfDocuments = journalposter ? journalposter.length : 0;
  const numberOfShownDocuments = filteredList.length;
  const hasJournalposter = journalposter && journalposter?.length > 0;

  return (
    <>
      {journalposter && (
        <div className={styles.container}>
          <div>
            <div className={styles.contentWrapper}>
              {isLoading ? (
                <ContentLoader language={language} />
              ) : hasJournalposter ? (
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
              ) : (
                <IngenJournalposter language={language} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Journalpostliste;
