import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort, Select } from "@navikt/ds-react";
import {
  getAlleJournalposterUrl,
  getFullmaktForhold,
  getFullmaktInfoUrl,
  pdlFullmaktUrl,
} from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/client/amplitude";
import { fetcher, postUser } from "@utils/client/api";
import { useEffect, type ChangeEvent } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import styles from "./SelectFullmakt.module.css";
import { setIsError, setIsValidatingJournalposter } from "@store/store";

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
    error: fullmaktsForholdError,
  } = useSWRImmutable<Fullmakter>(getFullmaktForhold, fetcher);

  const {
    data: fullmaktInfo,
    mutate: mutateUser,
    error: fullmaktsInfoError,
  } = useSWR<FullmaktInfoProps>(getFullmaktInfoUrl, fetcher);

  const {
    mutate: mutateJournalposter,
    isValidating,
    error: mutateJournalposterError,
  } = useSWR<JournalpostProps[]>(getAlleJournalposterUrl, fetcher);

  useEffect(() => {
    setIsValidatingJournalposter(isValidating);
  }, [isValidating]);

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await postUser({ ident: event.target.value });
    mutateJournalposter();
    mutateUser();
  };

  if (isLoadingFullmakter) {
    return null;
  }

  if (fullmaktsForholdError || fullmaktsInfoError || mutateJournalposterError) {
    setIsError(true);
    return null;
  }

  const hasFullmakter = fullmakter && fullmakter.fullmaktsGivere.length > 0;

  if (!hasFullmakter) {
    return (
      <BodyShort size="medium" className={styles.heading} aria-live="polite">
        {text.representasjonStandardTekst[language] +
          fullmakter?.navn + ". " + text.sosialhjelpTekst[language]}
          <a>{text.sosialhjelpLenketekst[language]}</a>
      </BodyShort>
    );
  }

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
            value={
              fullmaktInfo?.representertIdent === null
                ? ""
                : fullmaktInfo?.representertIdent
            }
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
        <BodyShort size="medium" className={styles.heading} aria-live="polite">
          {text.representasjonValgtBruker[language] +
            fullmaktInfo?.representertNavn + ". " + text.sosialhjelpTekst[language]}
            <a>{text.sosialhjelpLenketekst[language]}</a>
        </BodyShort>
      )}
    </>
  );
};

export default SelectFullmakt;
