import ContentLoader from "@components/loader/ContentLoader";
import { getAlleJournalposterUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import { BodyShort, Select } from "@navikt/ds-react";
import { text } from "@language/text";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";
import type { Language } from "@language/language";
import { filteredJournalposter, setJournalposter, searchAtom, vedtakFilterAtom } from "@store/store";
import { useStore } from "@nanostores/react";
import type { ChangeEvent } from "react";

interface Props {
  language: Language;
}

const Dokumentliste = ({ language }: Props) => {
  const { data: journalposter, isLoading } = useSWRImmutable<
    JournalpostProps[]
  >(getAlleJournalposterUrl, fetcher);

  const search = useStore(searchAtom);
  const vedtak = useStore(vedtakFilterAtom)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  }

  if (isLoading) {
    return null;
  }

  if (journalposter) {
    setJournalposter(journalposter);
  } 
  
  const filteredList = filteredJournalposter({search, vedtak});

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
                    {text.viserAntallDokumenter[language](4, 8)}
                  </BodyShort>
                  <Select label="Velg bostedsland" size="small" hideLabel onChange={handleSelectChange} >
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
