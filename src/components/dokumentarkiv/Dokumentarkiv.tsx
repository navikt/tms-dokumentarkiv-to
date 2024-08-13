import SelectFullmakt from "@components/representasjon/SelectFullmakt";
import Dokumentliste from "@components/dokumentliste/Dokumentliste";
import { SWRConfig } from "swr";
import NyttigOgVite from "@components/nyttig-og-vite/NyttigOgVite";

const Dokumentarkiv = () => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <SelectFullmakt language="nb"/>
      <Dokumentliste />
      <NyttigOgVite />
    </SWRConfig>
  );
};

export default Dokumentarkiv;
