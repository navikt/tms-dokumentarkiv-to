import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { describe, expect, it } from "vitest";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "./sorting";

const makeJournalpost = (opprettet: string): JournalpostProps =>
  ({ opprettet }) as JournalpostProps;

describe("sortByOpprettetAsc", () => {
  it("should place the most recently created journalpost first", () => {
    const eldst = makeJournalpost("2024-01-01T10:00:00.000Z");
    const nyest = makeJournalpost("2024-03-01T10:00:00.000Z");
    const midt = makeJournalpost("2024-02-01T10:00:00.000Z");

    const sorted = [eldst, nyest, midt].sort(sortByOpprettetAsc);

    expect(sorted.map((j) => j.opprettet)).toEqual([
      nyest.opprettet,
      midt.opprettet,
      eldst.opprettet,
    ]);
  });

  it("should return -1 when the first journalpost is newer than the second", () => {
    const a = makeJournalpost("2024-05-01T10:00:00.000Z");
    const b = makeJournalpost("2024-01-01T10:00:00.000Z");

    expect(sortByOpprettetAsc(a, b)).toBe(-1);
  });
});

describe("sortByOpprettetDesc", () => {
  it("should place the oldest journalpost first", () => {
    const eldst = makeJournalpost("2024-01-01T10:00:00.000Z");
    const nyest = makeJournalpost("2024-03-01T10:00:00.000Z");
    const midt = makeJournalpost("2024-02-01T10:00:00.000Z");

    const sorted = [nyest, eldst, midt].sort(sortByOpprettetDesc);

    expect(sorted.map((j) => j.opprettet)).toEqual([
      eldst.opprettet,
      midt.opprettet,
      nyest.opprettet,
    ]);
  });

  it("should return -1 when the first journalpost is older than the second", () => {
    const a = makeJournalpost("2024-01-01T10:00:00.000Z");
    const b = makeJournalpost("2024-05-01T10:00:00.000Z");

    expect(sortByOpprettetDesc(a, b)).toBe(-1);
  });
});
