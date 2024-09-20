import ContentLoader from "@components/loader/ContentLoader";
import { getJournalposterUrl, getFullmaktInfoUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import { Heading, BodyLong, BodyShort } from "@navikt/ds-react";
import { text } from "@language/text";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import type { JournalpostProps, JournalposterProps } from "./DokumentInterfaces";
import styles from "./Dokumentliste.module.css";
import Journalpost from "./journalpost/Journalpost";
import type { FullmaktInfoProps } from "@components/representasjon/SelectFullmakt";
import TemaLenke from "./temaside-lenke/TemaLenke";
import { format } from "date-fns";
import type { Language } from "@language/language";

interface Props {
  language: Language;
  temakode: string | undefined;
}

const Dokumentliste = ({ language, temakode }: Props) => {
  const journalpostUrl = temakode && getJournalposterUrl(temakode);
  const { data: journalposter, isLoading } = useSWRImmutable<JournalposterProps>(
    journalpostUrl,
    fetcher
  );
  const { data: fullmaktInfo, mutate: mutateUser } = useSWR<FullmaktInfoProps>(
    getFullmaktInfoUrl,
    fetcher
  );

  if (isLoading) {
    return null;
  }

  const dato = journalposter && format(new Date(journalposter.journalposter[0].opprettet), "dd.MM.yyyy");

  return (
    <>
      {journalposter && (
        <div className={styles.container}>
          <Heading level="1" size="xlarge">
            {journalposter?.navn}
          </Heading>
          <div>
            <BodyLong
              size="medium"
              className={styles.ingress}
              aria-live="polite"
            >
              {text.dokumentArkivIngress[language] + " " + journalposter?.navn}
              {fullmaktInfo?.viserRepresentertesData ? (
                <span>{" for " + fullmaktInfo.representertNavn + ". "}</span>
              ) : null}
              {journalposter && <TemaLenke lenketekst={journalposter?.navn} language={language}/>}
            </BodyLong>
            <BodyShort className={styles.sistEndret}>
              {text.sistEndret[language] + " " + dato}
            </BodyShort>
            <div className={styles.listWrapper}>
              <Heading level="2" size="medium" className={styles.heading}>
                {text.dokumentListeTittel[language]}
              </Heading>
              {isLoading ? (
                <ContentLoader language={language}/>
              ) : (
                <ul className={styles.list}>
                  {journalposter?.journalposter.map(
                    (journalpost: JournalpostProps) => {
                      return <Journalpost journalpost={journalpost} language={language}/>;
                    }
                  )}
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
