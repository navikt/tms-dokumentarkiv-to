import ContentLoader from "@components/loader/ContentLoader";
import type { FullmaktInfoProps } from "@components/representasjon/SelectFullmakt";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyLong, BodyShort, Heading, Select } from "@navikt/ds-react";
import { getFullmaktInfoUrl, getJournalposterUrl } from "@src/urls.client";
import {
  filteredJournalposterMedDirektelenke,
  setJournalposterMedDirektelenkeAtom,
} from "@store/store";
import { fetcher } from "@utils/client/api";
import { format } from "date-fns";
import { useState, type ChangeEvent } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import type {
  JournalpostProps,
  JournalposterProps,
} from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";
import TemaLenke from "./temaside-lenke/TemaLenke";

interface Props {
  language: Language;
  temakode: string | undefined;
  journalpostid: string | undefined;
}

const Dokumentliste = ({ language, temakode, journalpostid }: Props) => {
  const [order, setOrder] = useState("asc");
  const journalpostUrl = temakode && getJournalposterUrl(temakode);
  const { data: journalposter, isLoading } =
    useSWRImmutable<JournalposterProps>(journalpostUrl, fetcher);
  const { data: fullmaktInfo, mutate: mutateUser } = useSWR<FullmaktInfoProps>(
    getFullmaktInfoUrl,
    fetcher
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value);
  };

  if (isLoading) {
    return null;
  }

  if (journalposter) {
    setJournalposterMedDirektelenkeAtom(journalposter.journalposter);
  }

  const filteredList = filteredJournalposterMedDirektelenke({
    order,
    journalpostid,
  });

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
                {isLoading ? (
                  <ContentLoader language={language} />
                ) : (
                  <>
                    <article className={styles.dokumentElement}>
                      <Journalpost
                        journalpost={filteredList.lenketJournalpost}
                        language={language}
                      />
                    </article>
                    <div className={styles.dokumentlisteInfo}>
                      <BodyShort
                        size="small"
                        className={styles.antallDokumenterText}
                      >
                        Andre dokumenter om {journalposter?.navn}
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
                    <ul className={styles.list}>
                      {filteredList?.resterendeJournalposter.map(
                        (journalpost: JournalpostProps) => {
                          return (
                            <li
                              className={styles.dokumentElement}
                              key={journalpost.journalpostId}
                            >
                              <Journalpost
                                journalpost={journalpost}
                                language={language}
                              />
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </>
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
