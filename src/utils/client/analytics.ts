import type {AmplitudeEvent} from "@navikt/nav-dekoratoren-moduler";
import {getAnalyticsInstance} from "@navikt/nav-dekoratoren-moduler";

type ExtendedAmplitudeEvent = AmplitudeEvent<"navigere", {kategori: string}>;

const analyticsLogger =
  getAnalyticsInstance<ExtendedAmplitudeEvent>("tms-dokumentarkiv");

export const logEvent = async (
  komponent: string,
  kategori: string,
  lenketekst?: string
) => {
  await analyticsLogger("navigere", {
    origin: "tms-dokumentarkiv",
    eventName: "navigere",
    eventData: {
      komponent: komponent,
      kategori: kategori,
      lenketekst: lenketekst,
    },
  });
};
