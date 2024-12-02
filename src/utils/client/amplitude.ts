import { logAmplitudeEvent } from "@navikt/nav-dekoratoren-moduler";

export const logEvent = (komponent: string, kategori: string, lenketekst?: string) => {
  logAmplitudeEvent({
    origin: "tms-dokumentarkiv",
    eventName: "navigere",
    eventData: {
      komponent: komponent,
      kategori: kategori,
      lenketekst: lenketekst
    },
  });
}