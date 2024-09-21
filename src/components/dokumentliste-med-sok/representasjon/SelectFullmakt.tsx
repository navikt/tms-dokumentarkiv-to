import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort, Select } from "@navikt/ds-react";
import {
  getAlleJournalposterUrl,
  getFullmaktForhold,
  getFullmaktInfoUrl,
  pdlFullmaktUrl,
} from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/amplitude";
import { fetcher, postUser } from "@utils/client/api";
import type { ChangeEvent } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import styles from "./SelectFullmakt.module.css";

type fullmaktsGiverConfig = {
  navn: string;
  ident: string;
};

export interface Fullmakter {
  navn: string;
  ident: string;
  fullmaktsGivere: Array<fullmaktsGiverConfig>;
}

export interface FullmaktInfoProps {
  viserRepresentertesData: boolean;
  representertNavn: string;
  representertIdent: string;
}

const SelectFullmakt = ({ language }: { language: Language }) => {
  const {
    data: fullmakter,
    isLoading: isLoadingFullmakter,
    error,
  } = useSWRImmutable<Fullmakter>(getFullmaktForhold, fetcher);
  const { data: fullmaktInfo, mutate: mutateUser } = useSWR<FullmaktInfoProps>(
    getFullmaktInfoUrl,
    fetcher
  );
  const { mutate: mutateDokumentliste } = useSWR<JournalpostProps[]>(
    getAlleJournalposterUrl,
    fetcher
  );

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await postUser({ ident: event.target.value });
    mutateDokumentliste();
    mutateUser();
  };

  if (isLoadingFullmakter || error) {
    return null;
  }

  const hasFullmakter = fullmakter && fullmakter.fullmaktsGivere.length > 0;

  const genererListe = () => {
    const originalUser = {
      navn: fullmakter?.navn + text.representasjonDeg[language],
      ident: fullmakter?.ident,
    };
    let nedtrekksliste = [originalUser];

    fullmakter?.fullmaktsGivere?.map((fullmaktsGiver) => {
      const user = { navn: fullmaktsGiver.navn, ident: fullmaktsGiver.ident };
      nedtrekksliste = [...nedtrekksliste, user];
    });

    return nedtrekksliste;
  };

  const nedtrekksliste = genererListe();

  return (
    <>
      {hasFullmakter ? (
        <div className={styles.container}>
          <Select
            className={styles.select}
            label={text.representasjonLabel[language]}
            defaultValue={fullmakter?.ident}
            onChange={handleSelectChange}
            onClick={() =>
              logAmplitudeEvent("Nedtrekksliste", "Representasjon")
            }
          >
            {fullmakter &&
              nedtrekksliste?.map((user) => (
                <option key={user.ident} value={user.ident}>
                  {user.navn}
                </option>
              ))}
          </Select>
          <a
            href={pdlFullmaktUrl}
            className={styles.lenke}
            onClick={() =>
              logAmplitudeEvent(
                "Lenke",
                "Digital fullmakt innsynslenke",
                text.representasjonLenkeTekst["nb"]
              )
            }
          >
            {text.representasjonLenkeTekst[language]}
          </a>
        </div>
      ) : null}
      {fullmaktInfo?.viserRepresentertesData && (
        <BodyShort
          className={styles.valgtBrukerText}
          aria-live="polite"
        >
          {text.representasjonValgtBruker[language] +
            fullmaktInfo?.representertNavn}
        </BodyShort>
      )}
    </>
  );
};

export default SelectFullmakt;
