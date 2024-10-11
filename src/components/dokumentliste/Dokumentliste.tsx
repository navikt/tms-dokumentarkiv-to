import ContentLoader from "@components/loader/ContentLoader";
import { getJournalposterUrl, getFullmaktInfoUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import { Heading, BodyLong, BodyShort, Select } from "@navikt/ds-react";
import { text } from "@language/text";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import type {
  JournalpostProps,
  JournalposterProps,
} from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";
import type { FullmaktInfoProps } from "@components/representasjon/SelectFullmakt";
import TemaLenke from "./temaside-lenke/TemaLenke";
import { format } from "date-fns";
import type { Language } from "@language/language";
import { filteredJournalposter, setJournalposter } from "@store/store";
import { useState, type ChangeEvent } from "react";

interface Props {
  language: Language;
  temakode: string | undefined;
}

const Dokumentliste = ({ language, temakode }: Props) => {
  const [order, setOrder] = useState("asc");
  const journalpostUrl = temakode && getJournalposterUrl(temakode);
  const { data: journalposter, isLoading } =
    useSWRImmutable<JournalposterProps>(journalpostUrl, fetcher);
  const { data: fullmaktInfo, mutate: mutateUser } = useSWR<FullmaktInfoProps>(
    getFullmaktInfoUrl,
    fetcher
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value)
  }

  if (isLoading) {
    return null;
  }

  if (journalposter) {
    setJournalposter(journalposter.journalposter);
  } 
  
  const filteredList = filteredJournalposter({ order });
  const numberOfDocuments = journalposter?.journalposter.length;
  const numberOfShownDocuments = filteredList.length;

  const dato =
    journalposter &&
    format(new Date(journalposter.journalposter[0].opprettet), "dd.MM.yyyy");

  return (
    <>
      {journalposter && (
        <div className={styles.container}>
          <div className={styles.whiteBackground}>
            <Heading level="1" size="xlarge">
              {journalposter?.navn}
            </Heading>
            <div>
              <BodyLong
                size="medium"
                className={styles.ingress}
                aria-live="polite"
              >
                {text.dokumentArkivIngress[language] +
                  " " +
                  journalposter?.navn}
                {fullmaktInfo?.viserRepresentertesData ? (
                  <span>{" for " + fullmaktInfo.representertNavn + ". "}</span>
                ) : (
                  ". "
                )}
                {journalposter && (
                  <TemaLenke
                    lenketekst={journalposter?.navn}
                    language={language}
                  />
                )}
              </BodyLong>
              <BodyShort className={styles.sistEndret}>
                {text.sistEndret[language] + " " + dato}
              </BodyShort>
            </div>
            <div className={styles.grayBackground}>
              <div className={styles.listWrapper}>
                <div className={styles.dokumentlisteInfo}>
                  <BodyShort size="small" className={styles.text}>
                    {numberOfDocuments &&
                      text.viserAntallDokumenter[language](
                        numberOfShownDocuments,
                        numberOfDocuments
                      )}
                  </BodyShort>
                  <Select
                    label="Velg bostedsland"
                    size="small"
                    hideLabel
                    onChange={handleSelectChange}
                  >
                    <option value="asc">Nyeste først</option>
                    <option value="desc">Eldste først</option>
                  </Select>
                </div>
                {isLoading ? (
                  <ContentLoader language={language} />
                ) : (
                  <ul className={styles.list}>
                    {journalposter?.journalposter.map(
                      (journalpost: JournalpostProps) => {
                        return (
                          <Journalpost
                            journalpost={journalpost}
                            language={language}
                          />
                        );
                      }
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dokumentliste;
