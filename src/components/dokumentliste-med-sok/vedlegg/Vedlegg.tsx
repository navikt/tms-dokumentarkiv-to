import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Detail } from "@navikt/ds-react";
import { useState } from "react";
import { text } from "@language/text";
import { logAmplitudeEvent } from "@utils/amplitude";
import styles from "./Vedlegg.module.css";
import type { DokumentProps } from "../DokumentInterfaces";
import { dokumentUrl } from "@src/urls.client";
import type { Language } from "@language/language";
import { readableFileSize } from "@utils/readableFilesize";

interface Props {
  vedleggsListe: DokumentProps[];
  journalpostId: string;
  language: Language;
}

interface VedleggslenkeProps {
  url: string;
  tittel: string;
  filstorrelse: number;
  brukerHarTilgang: boolean;
}

const Vedlegg = ({ vedleggsListe, journalpostId, language }: Props) => {
  const [hideVedlegg, setHideVedlegg] = useState(true);
  const antallVedlegg = vedleggsListe.length;
  const hasVedlegg = antallVedlegg > 0;
  const grupperVedlegg = antallVedlegg > 4;
  const baseUrl = `${dokumentUrl}/${journalpostId}`;


  const handleOnClick = () => {
    setHideVedlegg(!hideVedlegg);
  };

  const VedleggsLenke = ({ url, tittel, brukerHarTilgang, filstorrelse }: VedleggslenkeProps) => {
    const tittelMedPdfTag = tittel + ".pdf";

    return brukerHarTilgang ? (
      <>
      <a href={url} className={styles.vedlegg} onClick={() => logAmplitudeEvent("Dokumentlenke", "Vedlegg")}>
        {tittelMedPdfTag}
      </a>
      <Detail>{readableFileSize(filstorrelse)}</Detail>
      </>
    ) : (
      <>
      <div className={styles.vedleggIngenTilgang}>{tittelMedPdfTag + text.vedleggKanIkkeVises[language]}</div>
      <Detail>{readableFileSize(filstorrelse)}</Detail>
      </>
    );
  };

  if(!hasVedlegg) {
    return null;
  }

  if (grupperVedlegg) {
    return (
      <div className={styles.veddleggsListe}>
        <BodyShort className={styles.tittel}>{text.antallVedlegg[language](antallVedlegg)}</BodyShort>
        <Button
          className={styles.btn}
          variant="secondary-neutral"
          size="xsmall"
          icon={
            hideVedlegg ? (
              <ChevronDownIcon fontSize="1.5rem" aria-hidden />
            ) : (
              <ChevronUpIcon fontSize="1.5rem" aria-hidden />
            )
          }
          onClick={() => handleOnClick()}
        >
          {hideVedlegg ? text.visVedlegg[language] : text.skjulVedlegg[language]}
        </Button>
        <div className={hideVedlegg ? styles.visuallyHidden : undefined}>
          {vedleggsListe.map((vedlegg: DokumentProps) => (
            <VedleggsLenke
              url={`${baseUrl}/${vedlegg.dokumentInfoId}`}
              tittel={vedlegg.tittel}
              brukerHarTilgang={vedlegg.brukerHarTilgang}
              filstorrelse={vedlegg.filstorrelse}
              key={vedlegg.dokumentInfoId}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.veddleggsListe}>
      <BodyShort className={styles.tittel}>{text.antallVedlegg[language](antallVedlegg)}</BodyShort>
      {vedleggsListe.map((vedlegg: DokumentProps) => (
        <VedleggsLenke
          url={`${baseUrl}/${vedlegg.dokumentInfoId}`}
          tittel={vedlegg.tittel}
          brukerHarTilgang={vedlegg.brukerHarTilgang}
          filstorrelse={vedlegg.filstorrelse}
          key={vedlegg.dokumentInfoId}
        />
      ))}
    </div>
  );
};

export default Vedlegg;