import ContentLoader from "@components/loader/ContentLoader";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { useStore } from "@nanostores/react";
import { BodyShort, Select, Skeleton } from "@navikt/ds-react";
import { getAlleJournalposterUrl } from "@src/urls.client";
import {
  filteredJournalposter,
  filtersAtom,
  isValidatingJournalposterAtom,
  sakstemaFiltersAtom,
  setIsError,
  setJournalposter,
  setSakstemaer,
  setShowFilters,
  setSortingOrder,
  sortingOrderAtom,
} from "@store/store";
import { fetcher } from "@utils/client/api";
import { useEffect, type ChangeEvent } from "react";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./JournalpostInterfaces";
import styles from "./Journalpostliste.module.css";
import IngenJournalposter from "./ingen-journalposter/IngenJournalposter";
import Journalpost from "./journalpost/Journalpost";
import SkeletonComponent from "@components/loader/skeleton/Skeleton";

interface Props {
  language: Language;
}

const Journalpostliste = ({ language }: Props) => {
  const { data: journalposter, isLoading, error : getJournalposterError } = useSWRImmutable<
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

  const isValidating = useStore(isValidatingJournalposterAtom);
  const filters = useStore(filtersAtom);
  const sakstemaFilters = useStore(sakstemaFiltersAtom);
  const order = useStore(sortingOrderAtom);
  const showContentLoader = isLoading || isValidating;

  if (getJournalposterError) {
    setIsError(true)
    return null;
  }

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
      <div className={styles.container}>
        <div>
          <div className={styles.contentWrapper}>
            {showContentLoader ? (
              <SkeletonComponent />
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
    </>
  );
};

export default Journalpostliste;
