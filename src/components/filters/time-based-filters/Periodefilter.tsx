import { Chips, Label } from "@navikt/ds-react";
import { useState } from "react";
import styles from "./Periodefilter.module.css"

const Periodefilter = () => {
  const [selected, setSelected] = useState(["Vis alle"]);

  return (
    <div className={styles.container}>
      <Label size={"medium"}>Velg hvilke dokumenter du vil se</Label>
      <Chips>
        <Chips.Toggle
          key={"1"}
          selected={selected.includes("Vis alle")}
          onClick={() =>
            setSelected(
              selected.includes("Vis alle")
                ? selected.filter((x) => x !== "Vis alle")
                : [...selected, "Vis alle"]
            )
          }
        >
          {"3"}
        </Chips.Toggle>
        <Chips.Toggle
          key={"2"}
          selected={selected.includes("Inn")}
          onClick={() =>
            setSelected(
              selected.includes("Inn")
                ? selected.filter((x) => x !== "Inn")
                : [...selected, "Inn"]
            )
          }
        >
          {"2"}
        </Chips.Toggle>
        <Chips.Toggle
          key={"3"}
          selected={selected.includes("option")}
          onClick={() =>
            setSelected(
              selected.includes("option")
                ? selected.filter((x) => x !== "option")
                : [...selected, "option"]
            )
          }
        >
          {"1"}
        </Chips.Toggle>
      </Chips>
    </div>
  );
};

export default Periodefilter;
