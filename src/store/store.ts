import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  order?: string;
  filters?: string[];
  sakstemaFilters: string[];
};

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const sakstemaerAtom = atom<string[]>([]);
export const sortingOrderAtom = atom<Filters["order"]>("asc");
export const filtersAtom = atom<Filters["filters"]>(["Alle"]);
export const showFiltersAtom = atom<boolean>(false);
export const sakstemaFiltersAtom = atom<Filters["sakstemaFilters"]>(["Ingen"]);
export const isValidatingJournalposterAtom = atom<boolean>(false);
export const isErrorAtom = atom<boolean>(false);

export function setIsError(bool: boolean) {
  isErrorAtom.set(bool)
}

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setSakstemaer(journalposter: JournalpostProps[]) {
  let sakstemaer: string[] = [];
  journalposter.map((journalpost) => {
    if (!sakstemaer.includes(journalpost.temanavn)) {
      sakstemaer = [...sakstemaer, journalpost.temanavn];
    }
  });
  sakstemaerAtom.set(sakstemaer);
}

export function setIsValidatingJournalposter(bool: boolean) {
  isValidatingJournalposterAtom.set(bool)
}

export function setFilters(filters: string[]) {
  filtersAtom.set(filters);
}

export function setShowFilters(bool: boolean) {
  showFiltersAtom.set(bool)
}

export function setSakstemaFilters(filters: string[]) {
  sakstemaFiltersAtom.set(filters);
}

export function setSortingOrder(order: string) {
  sortingOrderAtom.set(order)
}

export const filteredJournalposter = (filters?: Filters) => {
  let journalposter = journalposterAtom.get();

  if (filters?.order) {
    if (filters.order === "asc") {
      journalposter.sort(sortByOpprettetAsc);
    }
    if (filters.order === "desc") {
      journalposter.sort(sortByOpprettetDesc);
    }
  }

  if(!filters || filters.filters?.includes("Alle")) {
    return journalposter;
  }

  if (filters?.filters?.includes("Vedtak")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.tittel.toLowerCase().includes("vedtak");
    });
  }

  if (filters?.sakstemaFilters && !filters.sakstemaFilters.includes("Ingen")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.temanavn === filters.sakstemaFilters[0];
    });
  }

  return journalposter;
};
