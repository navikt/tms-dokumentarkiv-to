import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Language } from "@language/language";
import { text } from "@language/text";
import { BodyShort, Select } from "@navikt/ds-react";
import {
  getAlleJournalposterUrl,
  getFullmaktForhold,
  getFullmaktInfoUrl,
  pdlFullmaktUrl,
  hasDigisosContentUrl,
  digisosUrl,
} from "@src/urls.client";
import { logEvent } from "@utils/client/amplitude";
import { fetcher, postUser } from "@utils/client/api";
import { useEffect, type ChangeEvent } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import styles from "./SelectFullmakt.module.css";
import {
  setIsError,
  setIsValgtRepresentant,
  setIsValidatingJournalposter,
} from "@store/store";

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
  } = useSWRImmutable<Fullmakter>(getFullmaktForhold, fetcher, {
    revalidateOnFocus: false,
  });

  const {
    data: fullmaktInfo,
    mutate: mutateUser,
    error: fullmaktsInfoError,
  } = useSWR<FullmaktInfoProps>(getFullmaktInfoUrl, fetcher, {
    revalidateOnFocus: false,
  });

  const { data: hasDigisosContent, error: hasDigisosContentError } =
    useSWR<boolean>(hasDigisosContentUrl, fetcher, {
      revalidateOnFocus: false,
    });

  const {
    mutate: mutateJournalposter,
    isValidating,
    error: mutateJournalposterError,
  } = useSWR<JournalpostProps[]>(getAlleJournalposterUrl, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    setIsValidatingJournalposter(isValidating);
  }, [isValidating]);

  useEffect(() => {
    fullmaktInfo &&
      setIsValgtRepresentant(fullmaktInfo.viserRepresentertesData);
  }, [fullmaktInfo]);

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
        {text.representasjonStandardTekst[language] + fullmakter?.navn + ". "}
        {hasDigisosContent && (
          <span>
            <a
              href={digisosUrl}
              onClick={() => logEvent("Lenke", "Sosialhjelp ingress")}
            >
              {text.sosialhjelpLenketekst[language]}
            </a>
          </span>
        )}
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
            onClick={() => logEvent("Nedtrekksliste", "Representasjon")}
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
              logEvent(
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
          {text.representasjonStandardTekst[language] +
            fullmaktInfo?.representertNavn +
            ". "}
          {hasDigisosContent && (
            <span>
              <a
                href={digisosUrl}
                onClick={() => logEvent("Lenke", "Sosialhjelp ingress")}
              >
                {text.sosialhjelpLenketekst[language]}
              </a>
            </span>
          )}
        </BodyShort>
      )}
    </>
  );
};

export default SelectFullmakt;
