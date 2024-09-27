import dayjs from "dayjs";
import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";


export const sortByOpprettet = (a: JournalpostProps, b: JournalpostProps, order: string) => {
  if(order === "asc") {
    return dayjs(a.opprettet).isAfter(dayjs(b.opprettet)) ? -1 : 1;
  } else {
    return dayjs(b.opprettet).isAfter(dayjs(a.opprettet)) ? -1 : 1; 
  }
}
