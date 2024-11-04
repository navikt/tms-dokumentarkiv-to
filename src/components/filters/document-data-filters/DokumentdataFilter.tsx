import { Chips, Label } from "@navikt/ds-react";
import { useState } from "react";
import { setDokumentDataFilters } from "@store/store";
import styles from "./DokumentdataFilter.module.css"

const DokumentdataFilter = () => {
  const [selected, setSelected] = useState(["Vis alle"]);

  const handleToggle = (value: string[]) => {
    setSelected(value);
    setDokumentDataFilters(selected)
  };

  return (
    <div className={styles.container}>
      <Label size={"medium"}>Velg hvilke dokumenter du vil se</Label>
      <Chips>
        <Chips.Toggle
          key={"Vis alle"}
          selected={selected.includes("Vis alle")}
          onClick={() =>
            handleToggle(
              selected.includes("Vis alle")
                ? selected.filter((x) => x !== "Vis alle")
                : [...selected, "Vis alle"]
            )
          }
        >
          {"Vis alle"}
        </Chips.Toggle>
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
      </Chips>
    </div>
  );
};

export default DokumentdataFilter;
