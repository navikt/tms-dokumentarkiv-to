import type { Language } from "@language/language";
import { BodyShort, Detail } from "@navikt/ds-react";
import { dokumentUrl } from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/amplitude";
import { readableFileSize } from "@utils/readableFilesize";
import styles from "./Vedlegg.module.css";
import { text } from "@language/text";
import type { DokumentProps } from "@components/dokumentliste/DokumentInterfaces";

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

  const VedleggsLenke = ({
    url,
    tittel,
    brukerHarTilgang,
    filstorrelse,
  }: VedleggslenkeProps) => {
    const tittelMedPdfTag = tittel + ".pdf";

    return brukerHarTilgang ? (
      <div className={styles.container}>
        <a
          href={url}
          className={styles.vedlegg}
          onClick={() => logAmplitudeEvent("Dokumentlenke", "Vedlegg")}
        >
          {tittelMedPdfTag}
        </a>
        <Detail>{readableFileSize(filstorrelse)}</Detail>
      </div>
    ) : (
      <div className={styles.container}>
        <div className={styles.vedleggIngenTilgang}>
          {tittelMedPdfTag + text.vedleggKanIkkeVises[language]}
        </div>
        <Detail>{readableFileSize(filstorrelse)}</Detail>
      </div>
    );
  };

  return (
    <>
      <div className={styles.title}>
        <BodyShort size="medium" weight="semibold">
          {text.vedleggTitle[language]}
        </BodyShort>
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
  );
};

export default Vedlegg;
