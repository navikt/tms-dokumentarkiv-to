import dayjs from "dayjs";
import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";


export const sortByOpprettet = (a: JournalpostProps, b: JournalpostProps) =>
  dayjs(a.sisteEndret).isAfter(dayjs(b.sisteEndret)) ? -1 : 1;
