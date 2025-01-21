import type { Language } from "@language/language";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyShort, Tag } from "@navikt/ds-react";
import { baseUrlWithLanguage } from "@src/urls.client";
import { setAvsenderMottaker } from "@utils/client/setAvsenderMottaker";
import { format } from "date-fns";
import type { JournalpostProps } from "../JournalpostInterfaces";
import styles from "./Journalpost.module.css";
import { logEvent } from "@utils/client/amplitude";

interface Props {
  journalpost: JournalpostProps;
  language: Language;
  isValgtRepresentant: boolean;
}

const Journalpost = ({ journalpost, language, isValgtRepresentant }: Props) => {
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const avsenderText = setAvsenderMottaker(journalpost);
  const url = isValgtRepresentant
    ? `${baseUrlWithLanguage[language]}/tema/${journalpost.temakode}/${journalpost.journalpostId}?fullmakt=true`
    : `${baseUrlWithLanguage[language]}/tema/${journalpost.temakode}/${journalpost.journalpostId}`;

  return (
    <li className={styles.container} key={journalpost.journalpostId}>
      <article className={styles.wrapper}>
        <div>
          <BodyShort size="small">{dato + " - " + avsenderText}</BodyShort>
          <a className={styles.link} href={url} lang="nb" onClick={() => logEvent("Journalpostlenke", journalpost.temanavn)}>
            <BodyShort size="medium" weight="semibold" className={styles.linkText}>
              {journalpost.tittel}
            </BodyShort>
          </a>
          <Tag variant="neutral" className={styles.tag} lang="nb">
            {journalpost.temanavn}
          </Tag>
        </div>
        <div className={styles.chevron}>
          <ChevronRightIcon fontSize="1.25rem" />
        </div>
      </article>
    </li>
  );
};

export default Journalpost;
