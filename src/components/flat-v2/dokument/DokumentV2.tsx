import type { DokumentProps } from "../../dokumentliste/DokumentInterfaces.ts";
import { BodyShort } from "@navikt/ds-react";
import type { Language } from "@language/language.ts";
import { dokumentUrl } from "@src/urls.client.ts";
import { ChevronRightIcon} from "@navikt/aksel-icons";
import styles from "./DokumentV2.module.css";

interface Props {
    dokument: DokumentProps;
    dato: string;
    avsenderText: string;
    journalpostId: string;
    language: Language;
}

const Dokument = ({ dokument, dato, avsenderText, journalpostId, language }: Props) => {
    const url = `${dokumentUrl}/${journalpostId}/${dokument.dokumentInfoId}`;
    return (
        <div
            className={`${styles.container} ${styles.hover}`}
            key={dokument.dokumentInfoId}
        >
            <div className={styles.content}>
                <a className={styles.link} href={url}>
                    <BodyShort size="medium">
                        {dokument.tittel}
                    </BodyShort>
                </a>
                <BodyShort size={"small"}>{dato + " - " + avsenderText}</BodyShort>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <ChevronRightIcon  />
            </div>
        </div>
    );
};

export default Dokument;
