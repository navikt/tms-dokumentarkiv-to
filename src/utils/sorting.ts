import dayjs from "dayjs";
import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";


export const sortByOpprettet = (a: JournalpostProps, b: JournalpostProps) =>
  dayjs(a.opprettet).isAfter(dayjs(b.opprettet)) ? -1 : 1;
