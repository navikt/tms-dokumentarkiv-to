import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { describe, expect, it } from "vitest";
import { setAvsenderMottaker } from "./setAvsenderMottaker";

const makeJournalpost = (
  overrides: Partial<JournalpostProps>,
): JournalpostProps =>
  ({ avsender: "", mottaker: "", ...overrides }) as JournalpostProps;

describe("setAvsenderMottaker", () => {
  it("should return the avsender when it is set", () => {
    const journalpost = makeJournalpost({
      avsender: "NAV Klageinstans",
      mottaker: "Ola Nordmann",
    });

    expect(setAvsenderMottaker(journalpost)).toBe("NAV Klageinstans");
  });

  it("should fall back to the mottaker when avsender is null", () => {
    const journalpost = makeJournalpost({
      avsender: null as unknown as string,
      mottaker: "Ola Nordmann",
    });

    expect(setAvsenderMottaker(journalpost)).toBe("Ola Nordmann");
  });

  it("should fall back to the mottaker when avsender is an empty string", () => {
    const journalpost = makeJournalpost({
      avsender: "",
      mottaker: "Ola Nordmann",
    });

    expect(setAvsenderMottaker(journalpost)).toBe("Ola Nordmann");
  });
});
