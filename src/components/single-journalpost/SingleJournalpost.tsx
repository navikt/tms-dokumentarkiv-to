import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import {  EyeSlashIcon, FilePdfIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { dokumentUrl, getJournalpostUrl } from "@src/urls.client";
import { fetcher, NotFoundError } from "@utils/client/api";
import { setAvsenderMottaker } from "@utils/client/setAvsenderMottaker";
import { format } from "date-fns";
import useSWRImmutable from "swr/immutable";
import styles from "./SingleJournalpost.module.css";
import TemaLenke from "./temaside-lenke/TemaLenke";
import Vedlegg from "./vedlegg/Vedlegg";
import { readableFileSize } from "@utils/readableFilesize";
import { setIsError, setSingleJournalpostDisclaimerAtom } from "@store/store";
import SkeletonComponent from "@components/loader/skeleton/Skeleton";
import { useEffect } from "react";
import DokumentNotFound from "./finner-ikke-dokument/DokumentNotFound";
import { logEvent } from "@utils/client/amplitude";

interface Props {
  language: Language;
  journalpostId: string | undefined;
  fullmakt: string | null;
}

const SingleJournalpost = ({ language, journalpostId, fullmakt }: Props) => {
  const journalpostUrl = journalpostId && getJournalpostUrl(journalpostId);

  const {
    data: journalpost,
    isLoading,
    error,
  } = useSWRImmutable<JournalpostProps>(fullmakt ? `${journalpostUrl}?enable_repr=true` : journalpostUrl, fetcher, {revalidateOnFocus: false});

  useEffect(() => {
    if(journalpost && journalpost.dokument.tilgangssperre !== null) {
      setSingleJournalpostDisclaimerAtom(journalpost?.dokument.tilgangssperre)
    }
  }, [journalpost]);

  if (isLoading) {
    return (
      <SkeletonComponent />
    );
  }

  if(error instanceof NotFoundError) {
    return <DokumentNotFound language={language}/>
  }

  if (error) {
    setIsError(true);
  }

  if (!journalpost) {
    return null;
  }

  const tilgangsSperreInfo = () => {
    if(journalpost.dokument.tilgangssperre === null)
      return null;
    if(journalpost.dokument.tilgangssperre === "SkannetDokument")
      return <span>{text.tilgangssperreSkannet[language]}</span>;
    if(journalpost.dokument.tilgangssperre === "Tredjepart")
      return <span>{text.tilgangssperreTredjepart[language]}</span>;
    if(journalpost.dokument.tilgangssperre === "Annet")
      return <span>{text.tilgangssperreAnnet[language]}</span>;
  }

  const hovedDokumentUrl = `${dokumentUrl}/${journalpostId}/${journalpost.dokument.dokumentInfoId}`;
  const avsenderText = setAvsenderMottaker(journalpost);
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const veddleggsListe = journalpost.vedlegg;
  const isInngaaendeJournalpost =
    journalpost.journalposttype.toLowerCase() === "inn";

  const HovedDokument = () => {
    return (
      <>
        {journalpost?.dokument.brukerHarTilgang ? (
          <div className={`${styles.container} ${styles.hover}`}>
            <div className={styles.icon}>
              <FilePdfIcon fontSize="1.5rem" />
            </div>
            <div className={styles.content}>
              <a className={styles.link} href={hovedDokumentUrl} lang="nb" onClick={() => logEvent('hoveddokument', journalpost.temanavn)}>
                <BodyShort size="medium">
                  {"Åpne " + journalpost?.dokument.tittel.toLowerCase()}
                </BodyShort>
              </a>
              <Detail>
                {readableFileSize(journalpost.dokument.filstorrelse)}
              </Detail>
            </div>   
          </div>
        ) : (
          <div className={`${styles.container} ${styles.kanIkkeVises} ${styles.hover}`}>
            <div className={`${styles.icon} ${styles.iconKanIkkeVises}`}>
              <EyeSlashIcon fontSize="1.5rem" />
            </div>
            <div className={styles.content}>
              <div className={styles.tittelIkkeTilgang}>
                <BodyShort size="medium" lang="nb">
                  {journalpost?.dokument.tittel}
                </BodyShort>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Heading level="1" size="large" lang="nb">
        {journalpost?.tittel}
      </Heading>
      <HovedDokument />
      <div className={styles.temalenke}>
        {tilgangsSperreInfo()}
        <TemaLenke
          lenketekst={journalpost?.temanavn}
          temakode={journalpost?.temakode}
          language={language}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.detailTitle}>
          <Heading level="2" size="xsmall">
            {text.detaljerTitle[language]}
          </Heading>
        </div>
        <div className={styles.detail}>
          <BodyShort size="medium">
            {isInngaaendeJournalpost
              ? text.sendtInnTitle[language]
              : text.sendtTilTitle[language]}
          </BodyShort>
          <BodyShort size="medium">{avsenderText}</BodyShort>
        </div>
        <div className={styles.detail}>
          <BodyShort size="medium">{text.datoTitle[language]}</BodyShort>
          <BodyShort size="medium">{dato}</BodyShort>
        </div>
        <div className={styles.detail}>
          <BodyShort size="medium">{text.temaTitle[language]}</BodyShort>
          <BodyShort size="medium" lang="nb">{journalpost?.temanavn}</BodyShort>
        </div>
      </div>
      <div className={styles.vedlegg}>
        <Vedlegg
          vedleggsListe={veddleggsListe}
          journalpostId={journalpostId}
          language={language}
        />
      </div>
    </>
  );
};

export default SingleJournalpost;
