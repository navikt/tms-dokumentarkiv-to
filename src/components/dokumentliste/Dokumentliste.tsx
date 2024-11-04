import ContentLoader from "@components/loader/ContentLoader";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { useStore } from "@nanostores/react";
import { BodyShort, Select } from "@navikt/ds-react";
import { getAlleJournalposterUrl } from "@src/urls.client";
import {
  dokumentDataFiltersAtom,
  filteredJournalposter,
  searchAtom,
  setJournalposter,
  vedtakFilterAtom,
} from "@store/store";
import { fetcher } from "@utils/client/api";
import { useState, type ChangeEvent } from "react";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";

interface Props {
  language: Language;
}

const Dokumentliste = ({ language }: Props) => {
  const [order, setOrder] = useState("asc");
  const { data: journalposter, isLoading } = useSWRImmutable<
    JournalpostProps[]
  >(getAlleJournalposterUrl, fetcher);

  const search = useStore(searchAtom);
  const vedtak = useStore(vedtakFilterAtom);
  const dokumentDataFilters = useStore(dokumentDataFiltersAtom)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value);
  };

  if (isLoading) {
    return null;
  }

  if (journalposter) {
    setJournalposter(journalposter);
  }

  const filteredList = filteredJournalposter({ search, vedtak, order, dokumentDataFilters });
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
                  <ul className={styles.list}>
                    {filteredList?.map((journalpost: JournalpostProps) => {
                      return (
                        <Journalpost
                          journalpost={journalpost}
                          language={language}
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

export default Dokumentliste;
