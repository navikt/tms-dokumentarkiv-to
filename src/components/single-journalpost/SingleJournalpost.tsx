import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { FilePdfIcon } from "@navikt/aksel-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import { dokumentUrl, getJournalpostUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import { setAvsenderMottaker } from "@utils/client/setAvsenderMottaker";
import { format } from "date-fns";
import useSWRImmutable from "swr/immutable";
import styles from "./SingleJournalpost.module.css";
import TemaLenke from "./temaside-lenke/TemaLenke";
import Vedlegg from "./vedlegg/Vedlegg";

interface Props {
  language: Language;
  journalpostId: string | undefined;
}

const SingleJournalpost = ({ language, journalpostId }: Props) => {
  const journalpostUrl = journalpostId && getJournalpostUrl(journalpostId);

  const { data: journalpost, isLoading } = useSWRImmutable<JournalpostProps>(
    journalpostUrl,
    fetcher
  );

  const url = journalpost && `${dokumentUrl}/${journalpostId}/${journalpost.dokument.dokumentInfoId}`;
  const avsenderText =
    journalpost && setAvsenderMottaker(journalpost, language);
  const dato =
    journalpost && format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const veddleggsListe = journalpost && journalpost.vedlegg;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Heading level="1" size="large">
        {journalpost?.tittel}
      </Heading>
      <div className={`${styles.container} ${styles.hover}`}>
        <div className={styles.icon}>
          <FilePdfIcon fontSize="1.5rem" />
        </div>
        <div className={styles.content}>
          <a className={styles.link} href={url}>
            <BodyShort size="medium">{journalpost?.tittel}</BodyShort>
          </a>
        </div>
      </div>
      <div className={styles.temalenke}>
        <TemaLenke
          lenketekst={journalpost?.navn}
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
          <BodyShort size="medium">{text.avsenderTitle[language]}</BodyShort>
          <BodyShort size="medium">{avsenderText}</BodyShort>
        </div>
        <div className={styles.detail}>
          <BodyShort size="medium">{text.datoTitle[language]}</BodyShort>
          <BodyShort size="medium">{dato}</BodyShort>
        </div>
        <div className={styles.detail}>
          <BodyShort size="medium">{text.temaTitle[language]}</BodyShort>
          <BodyShort size="medium">{journalpost?.navn}</BodyShort>
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
