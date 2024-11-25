import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { ExternalLinkIcon, EyeSlashIcon, FilePdfIcon } from "@navikt/aksel-icons";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { baseUrlWithLanguage, dokumentUrl, getJournalpostUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
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

interface Props {
  language: Language;
  journalpostId: string | undefined;
}

const SingleJournalpost = ({ language, journalpostId }: Props) => {
  const journalpostUrl = journalpostId && getJournalpostUrl(journalpostId);

  const {
    data: journalpost,
    isLoading,
    error,
  } = useSWRImmutable<JournalpostProps>(journalpostUrl, fetcher, {revalidateOnFocus: false});

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

  if (error) {
    setIsError(true);
  }

  if (!journalpost) {
    return null;
  }

  const hovedDokumentUrl = `${dokumentUrl}/${journalpostId}/${journalpost.dokument.dokumentInfoId}`;
  const filtrertTemaUrl = `${baseUrlWithLanguage[language]}?tema=${journalpost.temakode}`
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
              <a className={styles.link} href={hovedDokumentUrl}>
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
                <BodyShort size="medium">
                  {journalpost?.dokument.tittel +
                    text.vedleggKanIkkeVises[language]}
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
      <Heading level="1" size="large">
        {journalpost?.tittel}
      </Heading>
      <HovedDokument />
      <div className={styles.temalenke}>
        <TemaLenke
          lenketekst={journalpost?.temanavn}
          temakode={journalpost?.temakode}
          language={language}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.detailTitle}>
          <BodyShort size="medium" weight="semibold">
            {text.detaljerTitle[language]}
          </BodyShort>
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
          <BodyShort size="medium"><a href={filtrertTemaUrl}>{journalpost?.temanavn}</a></BodyShort>
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
