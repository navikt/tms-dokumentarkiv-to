import { useStore } from "@nanostores/react";
import { Chips, Label } from "@navikt/ds-react";
import { sakstemaerAtom, setSakstemaFilters, showFiltersAtom } from "@store/store";
import { useState } from "react";
import styles from "./Filters.module.css";

const Filters = () => {
  const [selected, setSelected] = useState<string[]>(["Alle"]);
  const sakstemaer = useStore(sakstemaerAtom);
  const showFilters = useStore(showFiltersAtom);

  if (!showFilters) {
    return null;
  }

  const handleToggle = (value: string[]) => {
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
            key={sakstema.temanavn}
            checkmark={false}
            selected={selected.includes(sakstema.temanavn)}
            onClick={() => handleToggle([sakstema.temakode])}
          >
            {sakstema.temanavn}
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
