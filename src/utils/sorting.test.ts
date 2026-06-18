import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Sakstema } from "@store/store";
import { describe, expect, it } from "vitest";
import {
  alphabetically,
  byOpprettetDateAsc,
  byOpprettetDateDesc,
} from "./sorting";

const makeJournalpost = (opprettet: string): JournalpostProps =>
  ({ opprettet }) as JournalpostProps;

const makeSakstema = (temanavn: string): Sakstema => ({
  temanavn,
  temakode: temanavn.slice(0, 3).toUpperCase(),
});

describe("byOpprettetDateAsc", () => {
  it("should sort the most recently created journalpost first", () => {
    const sorted = [
      makeJournalpost("2024-01-01T10:00:00.000Z"),
      makeJournalpost("2024-03-01T10:00:00.000Z"),
      makeJournalpost("2024-02-01T10:00:00.000Z"),
    ].sort(byOpprettetDateAsc);

    expect(sorted.map((j) => j.opprettet)).toEqual([
      "2024-03-01T10:00:00.000Z",
      "2024-02-01T10:00:00.000Z",
      "2024-01-01T10:00:00.000Z",
    ]);
  });
});

describe("byOpprettetDateDesc", () => {
  it("should sort the oldest journalpost first", () => {
    const sorted = [
      makeJournalpost("2024-03-01T10:00:00.000Z"),
      makeJournalpost("2024-01-01T10:00:00.000Z"),
      makeJournalpost("2024-02-01T10:00:00.000Z"),
    ].sort(byOpprettetDateDesc);

    expect(sorted.map((j) => j.opprettet)).toEqual([
      "2024-01-01T10:00:00.000Z",
      "2024-02-01T10:00:00.000Z",
      "2024-03-01T10:00:00.000Z",
    ]);
  });
});

describe("alphabetically", () => {
  it("should sort sakstema by temanavn in ascending order", () => {
    const sorted = [
      makeSakstema("Pensjon"),
      makeSakstema("Arbeidsavklaringspenger"),
      makeSakstema("Bidrag"),
    ].sort(alphabetically);

    expect(sorted.map((s) => s.temanavn)).toEqual([
      "Arbeidsavklaringspenger",
      "Bidrag",
      "Pensjon",
    ]);
  });
});
