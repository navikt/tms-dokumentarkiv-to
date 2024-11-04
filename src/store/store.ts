import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  vedtak?: boolean;
  search?: string;
  order?: string;
  dokumentDataFilters: string[];
};

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const searchAtom = atom<Filters["search"]>();
export const vedtakFilterAtom = atom<Filters["vedtak"]>(false)
export const sortingOrder = atom<Filters["order"]>("asc");
export const dokumentDataFiltersAtom = atom<Filters["dokumentDataFilters"]>(["Vis alle"]);

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setDokumentDataFilters(filters: string[]) {
  dokumentDataFiltersAtom.set(filters);
}

export function setSearchAtom(input: string) {
  searchAtom.set(input);
}

export function setVedtakAtom(input: boolean) {
  vedtakFilterAtom.set(input);
}

export const filteredJournalposter = (filters?: Filters) => {

  let journalposter = journalposterAtom.get();

  if (filters?.vedtak) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.tittel.toLowerCase().includes("vedtak");
    });
  }

  if (filters?.dokumentDataFilters) {
    if (filters?.dokumentDataFilters.includes("Inn")) {
      journalposter = journalposter.filter((journalpost) => {
        return journalpost.avsendertype === "Inn";
      });
    }
    if (filters?.dokumentDataFilters.includes("Ut")) {
      journalposter = journalposter.filter((journalpost) => {
        return journalpost.avsendertype === "Ut";
      });
    }
  }

  if(filters?.order) {
    if(filters.order === "asc") {
      journalposter.sort(sortByOpprettetAsc)
    }
    if(filters.order === "desc") {
      journalposter.sort(sortByOpprettetDesc)
    }
  }

  return journalposter;
}