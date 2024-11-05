import { Chips, Label } from "@navikt/ds-react";
import { useState } from "react";
import { sakstemaerAtom, setSakstemaFilters, setDokumentDataFilters } from "@store/store";
import styles from "./DokumentdataFilter.module.css"
import { useStore } from "@nanostores/react";

const DokumentdataFilter = () => {
  const [selected, setSelected] = useState(["Alle"]);
  const sakstemaer = useStore(sakstemaerAtom);

  const handleToggle = (value: string[]) => {
    setDokumentDataFilters(value);
    setSelected(value);
  };

  const handleSakstemaToggle = (value: string[]) => {
    setSakstemaFilters(value);
    setSelected(value);
  };

  return (
    <div className={styles.container}>
      <Label size={"medium"}>Velg hvilke dokumenter du vil se</Label>
      <Chips>
        <Chips.Toggle
          key={"Inn"}
          selected={selected.includes("Inn")}
          onClick={() =>
            handleToggle(
              selected.includes("Inn")
                ? selected.filter((x) => x !== "Inn")
                : [...selected, "Inn"]
            )
          }
        >
          {"Inn"}
        </Chips.Toggle>
        <Chips.Toggle
          key={"Ut"}
          selected={selected.includes("Ut")}
          onClick={() =>
            handleToggle(
              selected.includes("Ut")
                ? selected.filter((x) => x !== "Ut")
                : [...selected, "Ut"]
            )
          }
        >
          {"Ut"}
        </Chips.Toggle>
        {sakstemaer.map((sakstema) => (
          <Chips.Toggle
            key={sakstema}
            selected={selected.includes(sakstema)}
            onClick={() =>
              handleSakstemaToggle(
                selected.includes(sakstema)
                  ? selected.filter((x) => x !== sakstema)
                  : [...selected, sakstema],
              )
            }
          >
            {sakstema}
          </Chips.Toggle>
        ))}
      </Chips>
    </div>
  );
};

export default DokumentdataFilter;
