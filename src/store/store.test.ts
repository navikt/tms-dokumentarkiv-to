import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { beforeEach, describe, expect, it } from "vitest";
import {
  filteredJournalposter,
  sakstemaerAtom,
  setJournalposter,
  setSakstemaer,
  setShowVedtakFilter,
  showVedtakFilterAtom,
} from "./store";

const makeJournalpost = (
  overrides: Partial<JournalpostProps> = {},
): JournalpostProps =>
  ({
    journalpostId: "1",
    temakode: "AAP",
    temanavn: "Arbeidsavklaringspenger",
    tittel: "Søknad om arbeidsavklaringspenger",
    avsender: "NAV",
    mottaker: "",
    journalposttype: "Inn",
    opprettet: "2024-01-01T12:00:00.000Z",
    dokument: {
      dokumentInfoId: "1",
      tittel: "Dokument",
      filtype: "PDF",
      filstorrelse: 1024,
      brukerHarTilgang: true,
      tilgangssperre: null,
    },
    vedlegg: [],
    ...overrides,
  }) as JournalpostProps;

describe("setSakstemaer", () => {
  beforeEach(() => {
    setJournalposter([]);
    sakstemaerAtom.set([]);
  });

  it("should derive a unique list of sakstemaer sorted alphabetically", () => {
    setSakstemaer([
      makeJournalpost({ temakode: "PEN", temanavn: "Pensjon" }),
      makeJournalpost({ temakode: "AAP", temanavn: "Arbeidsavklaringspenger" }),
      makeJournalpost({ temakode: "AAP", temanavn: "Arbeidsavklaringspenger" }),
    ]);

    expect(sakstemaerAtom.get()).toEqual([
      { temakode: "AAP", temanavn: "Arbeidsavklaringspenger" },
      { temakode: "PEN", temanavn: "Pensjon" },
    ]);
  });
});

describe("setShowVedtakFilter", () => {
  beforeEach(() => showVedtakFilterAtom.set([]));

  it("should enable the vedtak filter when a title contains 'vedtak'", () => {
    setShowVedtakFilter([makeJournalpost({ tittel: "Vedtak om dagpenger" })]);

    expect(showVedtakFilterAtom.get()).toEqual(["Vedtak"]);
  });

  it("should not enable the vedtak filter when no title contains 'vedtak'", () => {
    setShowVedtakFilter([makeJournalpost({ tittel: "Søknad om dagpenger" })]);

    expect(showVedtakFilterAtom.get()).toEqual([]);
  });
});

describe("filteredJournalposter", () => {
  beforeEach(() => setJournalposter([]));

  it("should return all journalposter when the 'Alle' filter is active", () => {
    setJournalposter([
      makeJournalpost({ journalpostId: "1", temakode: "AAP" }),
      makeJournalpost({ journalpostId: "2", temakode: "PEN" }),
    ]);

    expect(filteredJournalposter({ sakstemaFilters: ["Alle"] })).toHaveLength(
      2,
    );
  });

  it("should filter by the selected sakstema code", () => {
    setJournalposter([
      makeJournalpost({ journalpostId: "1", temakode: "AAP" }),
      makeJournalpost({ journalpostId: "2", temakode: "PEN" }),
    ]);

    const result = filteredJournalposter({ sakstemaFilters: ["PEN"] });

    expect(result).toHaveLength(1);
    expect(result[0].temakode).toBe("PEN");
  });

  it("should filter to only vedtak when the 'Vedtak' filter is active", () => {
    setJournalposter([
      makeJournalpost({ journalpostId: "1", tittel: "Vedtak om AAP" }),
      makeJournalpost({ journalpostId: "2", tittel: "Søknad om AAP" }),
    ]);

    const result = filteredJournalposter({ sakstemaFilters: ["Vedtak"] });

    expect(result).toHaveLength(1);
    expect(result[0].tittel).toBe("Vedtak om AAP");
  });
});
