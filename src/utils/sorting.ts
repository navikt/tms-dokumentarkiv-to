import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import type { Sakstema } from "@store/store";
import dayjs from "dayjs";

export const byOpprettetDateAsc = (a: JournalpostProps, b: JournalpostProps) =>
  dayjs(a.opprettet).isAfter(dayjs(b.opprettet)) ? -1 : 1;

export const byOpprettetDateDesc = (
  a: JournalpostProps,
  b: JournalpostProps,
) => (dayjs(b.opprettet).isAfter(dayjs(a.opprettet)) ? -1 : 1);

export const alphabetically = (a: Sakstema, b: Sakstema) =>
  a.temanavn < b.temanavn ? -1 : 1;
