import type { JournalpostProps } from "@components/dokumentliste-med-sok/DokumentInterfaces";
import { atom } from "nanostores";

export type Filters = {
  vedtak?: boolean;
  search?: string;
};

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const searchAtom = atom<Filters["search"]>();
export const vedtakFilterAtom = atom<Filters["vedtak"]>(false)

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setSearchAtom(input: string) {
  searchAtom.set(input);
}

export function setVedtakAtom(input: boolean) {
  vedtakFilterAtom.set(input);
}

export const filteredJournalposter = (filters?: Filters) => {

  let journalposter = journalposterAtom.get();

  if(filters?.search) {
    journalposter = journalposter.filter((journalpost) => journalpost.tittel.toLowerCase().includes(filters.search!.toLowerCase()))
  }

  if (filters?.vedtak) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.tittel.toLowerCase().includes("vedtak");
    });
  }

  return journalposter;
}