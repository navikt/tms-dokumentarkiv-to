import type { JournalpostProps } from "@components/journalpostliste/JournalpostInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  search?: string;
  order?: string;
  dokumentDataFilters?: string[];
  sakstemaFilters?: string[];
};

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const sakstemaerAtom = atom<string[]>([]);
export const sortingOrder = atom<Filters["order"]>("asc");
export const dokumentDataFiltersAtom = atom<Filters["dokumentDataFilters"]>([]);
export const sakstemaFiltersAtom = atom<Filters["sakstemaFilters"]>([]);

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setSakstemaer(journalposter: JournalpostProps[]) {
  let sakstemaer = sakstemaerAtom.get();
  journalposter.map((journalpost) => {
    if (!sakstemaer.includes(journalpost.temanavn)) {
      sakstemaer = [...sakstemaer, journalpost.temanavn];
    }
  });
  sakstemaerAtom.set(sakstemaer);
}

export function setSakstemaFilters(filters: string[]) {
  sakstemaFiltersAtom.set(filters);
}

export function setDokumentDataFilters(filters: string[]) {
  dokumentDataFiltersAtom.set(filters);
}

export const filteredJournalposter = (filters?: Filters) => {
  let journalposter = journalposterAtom.get();

  if(!filters) {
    return journalposter;
  }

  if (filters?.dokumentDataFilters?.includes("Vedtak")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.tittel.toLowerCase().includes("vedtak");
    });
  }

  if (filters?.dokumentDataFilters?.includes("Inn")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.journalposttype === "Inn";
    });
  }
  if (filters?.dokumentDataFilters?.includes("Ut")) {
    journalposter = journalposter.filter((journalpost) => {
      return journalpost.journalposttype === "Ut";
    });
  }

  if (filters?.order) {
    if (filters.order === "asc") {
      journalposter.sort(sortByOpprettetAsc);
    }
    if (filters.order === "desc") {
      journalposter.sort(sortByOpprettetDesc);
    }
  }

  return journalposter;
};
