import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  vedtak?: boolean;
  search?: string;
  order?: string;
  dokumentDataFilters?: string[];
  sakstemaFilters?: string[];
};

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const searchAtom = atom<Filters["search"]>();
export const vedtakFilterAtom = atom<Filters["vedtak"]>(false)
export const sortingOrder = atom<Filters["order"]>("asc");
export const dokumentDataFiltersAtom = atom<Filters["dokumentDataFilters"]>(["test1"]);
export const sakstemaerAtom = atom<string[]>([]);
export const sakstemaFiltersAtom = atom<Filters["sakstemaFilters"]>(["test"]);

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setSakstemaer(journalposter: JournalpostProps[]) {
  let sakstemaer = sakstemaerAtom.get()
  journalposter.map((journalpost) => {
    if(!sakstemaer.includes(journalpost.navn)) {
    sakstemaer = [...sakstemaer, journalpost.navn]
    }
  })

  sakstemaerAtom.set(sakstemaer);
}

export function setSakstemaFilters(filters: string[]) {
  sakstemaFiltersAtom.set(filters);
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