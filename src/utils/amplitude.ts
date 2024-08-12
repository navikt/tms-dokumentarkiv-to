import { init, track } from "@amplitude/analytics-browser";

export const initAmplitude = () => {
  init("default", undefined, {
    useBatch: true,
    serverUrl: "https://amplitude.nav.no/collect-auto",
    ingestionMetadata: {
      sourceName: window.location.toString(),
    },
  });
};

export const logAmplitudeEvent = (komponent: string, kategori: string, lenketekst?: string) => {
  track("Navigere", {komponent: komponent, kategori: kategori, lenketekst: lenketekst});
};
