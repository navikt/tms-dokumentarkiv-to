import { getJournalposterUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import useSWRImmutable from "swr/immutable";
import styles from "./Dokumentliste.module.css";
import type { JournalpostProps } from "./DokumentInterfaces";
import Journalpost from "./journalpost/Journalpost";

const Dokumentliste = () => {
  const { data: journalposter, isLoading } = useSWRImmutable<JournalpostProps[]>(getJournalposterUrl, fetcher);

  return (
    <ul className={styles.list}>
      {journalposter?.map((journalpost: JournalpostProps) => {
        return <Journalpost journalpost={journalpost} />;
      })}
    </ul>
  );
};

export default Dokumentliste;
