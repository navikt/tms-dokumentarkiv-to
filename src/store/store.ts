import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { alphabetically, byOpprettetDateAsc, byOpprettetDateDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  order?: string;
  sakstemaFilters: string[];
};

export interface Sakstema {
  temanavn: string;
  temakode: string;
}

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const sakstemaerAtom = atom<Sakstema[]>([]);
export const sakstemaFiltersAtom = atom<Filters["sakstemaFilters"]>(["Alle"]);
export const singleJournalpostDisclaimerAtom = atom<string | null>(null);
export const sortingOrderAtom = atom<Filters["order"]>("asc");
export const showFiltersAtom = atom<boolean>(false);
export const isValidatingJournalposterAtom = atom<boolean>(false);
export const isErrorAtom = atom<boolean>(false);
export const isValgtRepresentantAtom = atom<boolean>(false);

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


  sakstemaerAtom.set(journalposter.map(toSakstemaer).filter(byUniques).sort(alphabetically));
}

export function setSingleJournalpostDisclaimerAtom(string: string | null) {
  singleJournalpostDisclaimerAtom.set(string)
}

export function setIsValidatingJournalposter(bool: boolean) {
  isValidatingJournalposterAtom.set(bool)
}

export function setIsValgtRepresentant(bool: boolean) {
  isValgtRepresentantAtom.set(bool)
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
      journalposter.sort(byOpprettetDateAsc);
    }
    if (filters.order === "desc") {
      journalposter.sort(byOpprettetDateDesc);
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
