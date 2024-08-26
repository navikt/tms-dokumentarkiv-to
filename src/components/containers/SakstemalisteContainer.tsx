import Disclaimer from "@components/disclaimers/disclaimer-index/Disclaimer";
import SakstemaListe from "@components/sakstemaliste/SakstemaListe";
import type { Language } from "@language/language";
import { SWRConfig } from "swr";

const SakstemalisteContainer = ({ language }: { language: Language }) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <SakstemaListe language={language} />
      <Disclaimer language={language}/>
    </SWRConfig>
  );
};

export default SakstemalisteContainer;
