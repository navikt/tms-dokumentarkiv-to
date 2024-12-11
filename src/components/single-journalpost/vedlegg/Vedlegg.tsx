import type { DokumentProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { dokumentUrl } from "@src/urls.client";
import { logEvent } from "@utils/client/amplitude";
import { readableFileSize } from "@utils/readableFilesize";
import styles from "./Vedlegg.module.css";
import { ExternalLinkIcon } from "@navikt/aksel-icons";

interface Props {
  vedleggsListe: DokumentProps[] | undefined;
  journalpostId: string | undefined;
  language: Language;
}

interface VedleggslenkeProps {
  url: string;
  tittel: string;
  filstorrelse: number;
  brukerHarTilgang: boolean;
}

const Vedlegg = ({ vedleggsListe, journalpostId, language }: Props) => {
  const baseUrl = `${dokumentUrl}/${journalpostId}`;
  const hasVedlegg = vedleggsListe && vedleggsListe.length > 0;

  const VedleggsLenke = ({
    url,
    tittel,
    brukerHarTilgang,
    filstorrelse,
  }: VedleggslenkeProps) => {
    const tittelMedPdfTag = tittel + ".pdf";

    return brukerHarTilgang ? (
      <div className={styles.container}>
        <div className={styles.linkWIthIcon}>
          <a
            href={url}
            className={styles.vedlegg}
            lang="nb"
            onClick={() => logEvent("Dokumentlenke", "Vedlegg")}
          >
            {tittelMedPdfTag}
          </a>
        </div>
        <Detail>{readableFileSize(filstorrelse)}</Detail>
      </div>
    ) : (
      <div className={styles.container}>
        <div className={styles.vedleggIngenTilgang} lang="nb">
          {tittelMedPdfTag}
        </div>
        <Detail>{readableFileSize(filstorrelse)}</Detail>
      </div>
    );
  };

  return hasVedlegg ? (
    <>
      <div className={styles.title}>
        <Heading level="2" size="xsmall">
          {text.vedleggTitle[language]}
        </Heading>
      </div>
      {vedleggsListe?.map((vedlegg: DokumentProps) => (
        <VedleggsLenke
          url={`${baseUrl}/${vedlegg.dokumentInfoId}`}
          tittel={vedlegg.tittel}
          brukerHarTilgang={vedlegg.brukerHarTilgang}
          filstorrelse={vedlegg.filstorrelse}
          key={vedlegg.dokumentInfoId}
        />
      ))}
    </>
  ) : null;
};

export default Vedlegg;
