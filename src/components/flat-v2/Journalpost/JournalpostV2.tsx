import { format } from "date-fns";
import type { JournalpostProps } from "../../dokumentliste/DokumentInterfaces.ts";
import type { Language } from "@language/language.ts";
import { setAvsenderMottaker } from "@utils/client/setAvsenderMottaker.ts";
import DokumentV2 from "@components/flat-v2/dokument/DokumentV2.tsx";
import styles from "./JournalpostV2.module.css";

interface Props {
    journalpost: JournalpostProps;
    language: Language;
}

const Journalpost = ({ journalpost, language }: Props) => {
    const dato = format(new Date(journalpost.opprettet), "dd.MM.yyyy");
    const avsenderText = setAvsenderMottaker(journalpost, language);

    return (
        <li className={styles.container} style={{background: "var(--a-surface-subtle, #F2F3F5)", padding: "12px"
        }} key={journalpost.journalpostId}>
            <article>
                {journalpost.dokument.brukerHarTilgang ? (
                    <DokumentV2
                        dokument={journalpost.dokument}
                        dato={dato}
                        avsenderText={avsenderText}
                        journalpostId={journalpost.journalpostId}
                        language={language}
                    />
                ) : (
                    <DokumentV2
                        dokument={journalpost.dokument}
                        dato={dato}
                        avsenderText={avsenderText}
                        journalpostId={journalpost.journalpostId}
                        language={language}
                    />
                )}
            </article>
        </li>
    );
};

export default Journalpost;
