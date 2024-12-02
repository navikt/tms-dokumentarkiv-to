import type { Language } from "@language/language";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyShort, Tag } from "@navikt/ds-react";
import { baseUrlWithLanguage } from "@src/urls.client";
import { setAvsenderMottaker } from "@utils/client/setAvsenderMottaker";
import { format } from "date-fns";
import type { JournalpostProps } from "../JournalpostInterfaces";
import styles from "./Journalpost.module.css";

interface Props {
  journalpost: JournalpostProps;
  language: Language;
}

const Journalpost = ({ journalpost, language }: Props) => {
  const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
  const avsenderText = setAvsenderMottaker(journalpost);
  const url = `${baseUrlWithLanguage[language]}/tema/${journalpost.temakode}/${journalpost.journalpostId}?fullmakt=true`;

  return (
    <li className={styles.container} key={journalpost.journalpostId}>
      <article className={styles.wrapper}>
        <div>
          <a className={styles.link} href={url}>
            <BodyShort size="medium" weight="semibold">
              {journalpost.tittel}
            </BodyShort>
          </a>
          <BodyShort size="small">{dato + " - " + avsenderText}</BodyShort>
          <Tag variant="neutral" className={styles.tag}>{journalpost.temanavn}</Tag>
        </div>
        <div className={styles.chevron}>
          <ChevronRightIcon fontSize="1.25rem"/>
        </div>
      </article>
    </li>
  );
};

export default Journalpost;
