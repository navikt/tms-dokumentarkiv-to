import { useStore } from "@nanostores/react";
import { Chips, Label } from "@navikt/ds-react";
import { sakstemaerAtom, setFilters, setSakstemaFilters } from "@store/store";
import { useState } from "react";
import styles from "./Filters.module.css";

const Filters = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const sakstemaer = useStore(sakstemaerAtom);

  const handleToggle = (value: string[]) => {
    setFilters(value);
    setSakstemaFilters(["Ingen"]);
    setSelected(value);
  };

  const handleSakstemaToggle = (value: string[]) => {
    setFilters(["Sakstema"]);
    setSakstemaFilters(value);
    setSelected(value);
  };
  return (
    <div className={styles.container}>
      <Label size={"medium"}>Velg hvilke dokumenter du vil se</Label>
      <Chips>
        <Chips.Toggle
          key={"Alle"}
          checkmark={false}
          selected={selected.includes("Alle")}
          onClick={() => handleToggle(["Alle"])}
        >
          {"Alle"}
        </Chips.Toggle>
        {sakstemaer.map((sakstema) => (
          <Chips.Toggle
            key={sakstema}
            checkmark={false}
            selected={selected.includes(sakstema)}
            onClick={() => handleSakstemaToggle([sakstema])}
          >
            {sakstema}
          </Chips.Toggle>
        ))}
        <Chips.Toggle
          key={"Vedtak"}
          checkmark={false}
          selected={selected.includes("Vedtak")}
          onClick={() => handleToggle(["Vedtak"])}
        >
          {"Vedtak"}
        </Chips.Toggle>
      </Chips>
    </div>
  );
};

export default Filters;
