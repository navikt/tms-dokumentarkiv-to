import Disclaimer from "@components/disclaimers/disclaimer-dokumentliste/Disclaimer.tsx";
import SelectFullmaktV2 from "@components/flat-v2/representasjon/SelectFullmaktV2.tsx";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite.tsx";
import type { Language } from "@language/language.ts";
import { text } from "@language/text.ts";
import { Chips, Heading, Label } from "@navikt/ds-react";
import { SWRConfig } from "swr";
import { useState } from "react";
import DokumentlisteUtenVedlegg from "@components/flat-v2/dokumentliste/DokumentlisteV2.tsx";
import styles from "./OnePagerContainerV2.module.css";

interface Props {
  language: Language;
}

const OnePagerContainerV2 = ({ language }: Props) => {
    const [selected, setSelected] = useState(["Vis alle"]);

    return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <div className={styles.whiteBackground}>
        <Heading level="1" size="large">
          {text.dokumentarkiv[language]}
        </Heading>
        <SelectFullmaktV2 language={language} />
      </div>
      <div>
          <Label size={"medium"}>Velg hvilke dokumenter du vil se</Label>
          <Chips>
              <Chips.Toggle
                  key={"option"}
                  selected={selected.includes("Vis alle")}
                  onClick={() =>
                      setSelected(
                          selected.includes("Vis alle")
                              ? selected.filter((x) => x !== "Vis alle")
                              : [...selected, "Vis alle"],
                      )
                  }
              >
                  {"Vis alle"}
              </Chips.Toggle>
              <Chips.Toggle
                  key={"option"}
                  selected={selected.includes("Inn")}
                  onClick={() =>
                      setSelected(
                          selected.includes("Inn")
                              ? selected.filter((x) => x !== "Inn")
                              : [...selected, "Inn"],
                      )
                  }
              >
                  {"Inn"}
              </Chips.Toggle>
              <Chips.Toggle
                  key={"option"}
                  selected={selected.includes("option")}
                  onClick={() =>
                      setSelected(
                          selected.includes("option")
                              ? selected.filter((x) => x !== "option")
                              : [...selected, "option"],
                      )
                  }
              >
                  {"Ut"}
              </Chips.Toggle>
          </Chips>
        <DokumentlisteUtenVedlegg language={language}/>
        <Disclaimer language={language}/>
        <NyttigOgVite language={language}/>
      </div>
    </SWRConfig>
  );
};

export default OnePagerContainerV2;