import { text } from "@language/text";
import { Heading } from "@navikt/ds-react";
import { getSakstemaerUrl } from "@src/urls.client";
import { fetcher } from "@utils/client/api";
import useSWRImmutable from "swr/immutable";
import IngenSaker from "./IngenSaker";
import styles from "./SakstemaListe.module.css";
import SakstemaListeElement from "./SakstemaListeElement";
import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import type { Language } from "@language/language";

export interface SakstemaElement {
  navn: string;
  kode: string;
  sistEndret: string;
  detaljvisningUrl: string;
}

const SakstemaListe = ({ language }: { language: Language }) => {
  const { data: sakstemaliste, isLoading } = useSWRImmutable<SakstemaElement[]>(
    getSakstemaerUrl,
    fetcher
  );

  if (isLoading) {
    return null;
  }
  const tomListe = sakstemaliste?.length == 0;

  return (
    <>
      <Heading level="1" size="large">
        {text.dokumentarkiv[language]}
      </Heading>
      <SelectFullmakt />
      {tomListe ? (
        <IngenSaker language={language}/>
      ) : (
        <div>
          <ul className={styles.liste}>
            {sakstemaliste?.map((sakstema: SakstemaElement) => (
              <SakstemaListeElement sakstema={sakstema} key={sakstema.navn} language={language}/>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SakstemaListe;
