import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import dayjs from "dayjs";

export const sortByOpprettetAsc = (a: JournalpostProps, b: JournalpostProps) =>
  dayjs(a.opprettet).isAfter(dayjs(b.opprettet)) ? -1 : 1;

export const sortByOpprettetDesc = (
  a: JournalpostProps,
  b: JournalpostProps,
) => (dayjs(b.opprettet).isAfter(dayjs(a.opprettet)) ? -1 : 1);
