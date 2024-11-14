import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  order?: string;
  queryParam?: string[];
  sakstemaFilters: string[];
};

interface Sakstema {
  temanavn: string;
  temakode: string;
}

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const sakstemaerAtom = atom<Sakstema[]>([]);
export const sakstemaFiltersAtom = atom<Filters["sakstemaFilters"]>(["Alle"]);
export const queryParam = atom<Filters["queryParam"]>([]);
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
  let sakstemaer: Sakstema[] = [];
  journalposter.map((journalpost) => {
    if (!sakstemaer.some((sakstema) => sakstema.temanavn === journalpost.temanavn)) {
      sakstemaer = [...sakstemaer, { temanavn: journalpost.temanavn, temakode: journalpost.temakode }];
    } else {
      sakstemaer = [...sakstemaer];
    }
  });
  sakstemaerAtom.set(sakstemaer);
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

export function setQueryParam(param: string[]) {
  queryParam.set(param);
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

  if (filters?.sakstemaFilters?.includes("Vedtak")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.tittel.toLowerCase().includes("vedtak");
    });
  }

  if (filters?.sakstemaFilters && !filters.sakstemaFilters.includes("Alle") && !filters.sakstemaFilters.includes("Vedtak")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.temakode === filters.sakstemaFilters[0];
    });
  }

  return journalposter;
};
