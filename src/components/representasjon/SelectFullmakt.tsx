import { Heading, Select } from "@navikt/ds-react";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import type { ChangeEvent } from "react";
import { fetcher, postUser } from "@utils/client/api";
import { text } from "@language/text";
import styles from "./RepresentasjonsContainer.module.css";
import {
  getFullmaktForhold,
  getFullmaktInfoUrl,
  getJournalposterUrl,
  pdlFullmaktUrl,
} from "@src/urls.client";
import { logAmplitudeEvent } from "@utils/amplitude";
import type { Language } from "@language/language";
import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";

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
  const { data: fullmakter, isLoading: isLoadingFullmakter } = useSWRImmutable<Fullmakter>(getFullmaktForhold, fetcher);
  const { data: fullmaktInfo, mutate: mutateUser } = useSWR<FullmaktInfoProps>(getFullmaktInfoUrl, fetcher);
  const { mutate: mutateSakstemaer } = useSWR<JournalpostProps[]>(getJournalposterUrl, fetcher);

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    await postUser({ ident: event.target.value });
    mutateSakstemaer();
    mutateUser();
  };

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
      <div className={styles.container}>
        <Select
          className={styles.select}
          label={text.representasjonLabel[language]}
          defaultValue={fullmakter?.ident}
          onChange={handleSelectChange}
          onClick={() => logAmplitudeEvent("Nedtrekksliste", "Representasjon")}
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
      {fullmaktInfo?.viserRepresentertesData && (
        <Heading
          size="large"
          level="2"
          className={styles.heading}
          aria-live="polite"
        >
          {text.representasjonValgtBruker[language] +
            fullmaktInfo?.representertNavn}
        </Heading>
      )}
    </>
  );
};

export default SelectFullmakt;
