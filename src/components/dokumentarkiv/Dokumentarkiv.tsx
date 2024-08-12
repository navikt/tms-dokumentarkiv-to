import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import Dokumentliste from "@components/dokumentliste/Dokumentliste";
import { SWRConfig } from "swr";

const Dokumentarkiv = () => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <SelectFullmakt language="nb"/>
      <Dokumentliste />
    </SWRConfig>
  );
};

export default Dokumentarkiv;
