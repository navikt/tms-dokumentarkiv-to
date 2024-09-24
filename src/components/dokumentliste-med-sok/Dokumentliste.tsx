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
import { journalposterAtom, setJournalposter } from "@store/store";
import { useStore } from "@nanostores/react";

interface Props {
  language: Language;
}

const Dokumentliste = ({ language }: Props) => {
  const { data: journalposter, isLoading } = useSWRImmutable<
    JournalpostProps[]
  >(getAlleJournalposterUrl, fetcher);

  const list = useStore(journalposterAtom);

  if (isLoading) {
    return null;
  }

  if (journalposter) {
    setJournalposter(journalposter);
  }

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
                  <Select label="Velg bostedsland" size="small" hideLabel>
                    <option value="nyeste">Nyeste først</option>
                    <option value="eldste">Eldste først</option>
                  </Select>
                  </div>
                  <ul className={styles.list}>
                    {list.map((journalpost: JournalpostProps) => {
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
