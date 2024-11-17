import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";
import Journalpost from "@components/journalpostliste/journalpost/Journalpost.tsx";

export type Filters = {
  order?: string;
  sakstemaFilters: string[];
};

interface Sakstema {
  temanavn: string;
  temakode: string;
}

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const sakstemaerAtom = atom<Sakstema[]>([]);
export const sakstemaFiltersAtom = atom<Filters["sakstemaFilters"]>(["Alle"]);
export const sortingOrderAtom = atom<Filters["order"]>("asc");
export const showFiltersAtom = atom<boolean>(false);
export const isValidatingJournalposterAtom = atom<boolean>(false);
export const isErrorAtom = atom<boolean>(false);

export function setIsError(bool: boolean) {
  isErrorAtom.set(bool)
}

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setSakstemaer(journalposter: JournalpostProps[]) {
  const toSakstemaer = (journalpost: JournalpostProps) => (
      {temanavn: journalpost.temanavn, temakode: journalpost.temakode }
  );

  const byUniques = (value: Sakstema, index: number, self: Sakstema[]) =>
      index === self.findIndex((sakstema: any) => (
          sakstema.temakode === value.temakode
      ));

  sakstemaerAtom.set(journalposter.map(toSakstemaer).filter(byUniques));
}

export function setIsValidatingJournalposter(bool: boolean) {
  isValidatingJournalposterAtom.set(bool)
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

  if(!filters || filters.sakstemaFilters?.includes("Alle")) {
    return journalposter;
  }

  if (filters?.sakstemaFilters && !filters.sakstemaFilters.includes("Alle")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.temakode === filters.sakstemaFilters[0];
    });
  }

  return journalposter;
};
