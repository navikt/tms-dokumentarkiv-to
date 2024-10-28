import ContentLoader from "@components/loader/ContentLoader.tsx";
import { getAlleJournalposterUrl } from "@src/urls.client.ts";
import { fetcher } from "@utils/client/api.ts";
import { BodyShort, Select } from "@navikt/ds-react";
import { text } from "@language/text.ts";
import useSWRImmutable from "swr/immutable";
import type { JournalpostProps } from "../../dokumentliste/DokumentInterfaces.ts";
import JournalpostV2 from "@components/flat-v2/Journalpost/JournalpostV2.tsx";
import type { Language } from "@language/language.ts";
import { filteredJournalposter, setJournalposter, searchAtom, vedtakFilterAtom } from "@store/store.ts";
import { useStore } from "@nanostores/react";
import { useState, type ChangeEvent } from "react";
import styles from "../../dokumentliste/Dokumentliste.module.css";

interface Props {
    language: Language;
}

const Dokumentliste = ({ language }: Props) => {
    const [order, setOrder] = useState("asc");
    const { data: journalposter, isLoading } = useSWRImmutable<
        JournalpostProps[]
    >(getAlleJournalposterUrl, fetcher);

    const search = useStore(searchAtom);
    const vedtak = useStore(vedtakFilterAtom)

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOrder(event.target.value)
    }

    if (isLoading) {
        return null;
    }

    if (journalposter) {
        setJournalposter(journalposter);
    }

    const filteredList = filteredJournalposter({search, vedtak, order});
    const numberOfDocuments = journalposter?.length;
    const numberOfShownDocuments = filteredList.length;

    return (
        <>
            {journalposter && (
                <div className={styles.container}>
                    <div>
                        <div className={styles.contentWrapper}>
                            {isLoading ? (
                                <ContentLoader language={language} />
                            ) : (
                                <>
                                    <div className={styles.dokumentlisteInfo}>
                                        <BodyShort size="small" className={styles.text}>
                                            {numberOfDocuments && text.viserAntallDokumenter[language](numberOfShownDocuments, numberOfDocuments)}
                                        </BodyShort>
                                        <Select label="Velg bostedsland" size="small" hideLabel onChange={handleSelectChange} >
                                            <option value="asc">Nyeste først</option>
                                            <option value="desc">Eldste først</option>
                                        </Select>
                                    </div>
                                    <ul className={styles.list}>
                                        {filteredList?.map((journalpost: JournalpostProps) => {
                                            return (
                                                <JournalpostV2
                                                    journalpost={journalpost}
                                                    language={language}
                                                />
                                            );
                                        })}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dokumentliste;
