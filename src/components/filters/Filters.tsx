import { useStore } from "@nanostores/react";
import { Chips, Label } from "@navikt/ds-react";
import { sakstemaerAtom, setQueryParam, setSakstemaFilters, showFiltersAtom } from "@store/store";
import { useEffect, useState } from "react";
import styles from "./Filters.module.css";

interface Props {
  queryParam: string | null;
}

const Filters = ({ queryParam }: Props) => {
  const [selected, setSelected] = useState<string[]>(["Alle"]);
  const sakstemaer = useStore(sakstemaerAtom);
  const showFilters = useStore(showFiltersAtom);

  const isValidFilterValue = (queryParam: string | null) => {
      let sakstemakoder: string[] = ["Alle", "Vedtak"];
      sakstemaer?.map((sakstema) => {
        sakstemakoder = [...sakstemakoder, sakstema.temakode]
      })
      if(queryParam !== null) {
      return sakstemakoder.includes(queryParam)
      } else {
        return false;
      }
  }

  const isValidQueryParam = isValidFilterValue(queryParam);

  useEffect(() => {
    if(queryParam && isValidQueryParam) {
        setQueryParam([queryParam])
        setSelected([queryParam])
        setSakstemaFilters([queryParam]);
    }
  }, [queryParam, isValidQueryParam])

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
            selected={selected.includes(sakstema.temakode)}
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
