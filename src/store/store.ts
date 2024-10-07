import type { JournalpostProps } from "@components/dokumentliste-med-sok/DokumentInterfaces";
import { sortByOpprettetAsc, sortByOpprettetDesc } from "@utils/sorting";
import { atom } from "nanostores";

export type Filters = {
  vedtak?: boolean;
  search?: string;
  order?: string;
  journalpostid?: string;
};

export const journalposterAtom = atom<JournalpostProps[]>([]);
export const journalposterMedDirektelenkeAtom = atom<JournalpostProps[]>([]);
export const searchAtom = atom<Filters["search"]>();
export const vedtakFilterAtom = atom<Filters["vedtak"]>(false)
export const sortingOrder = atom<Filters["order"]>("asc");

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}

export function setJournalposterMedDirektelenkeAtom(journalposter: JournalpostProps[]) {
  journalposterMedDirektelenkeAtom.set(journalposter);
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

export const filteredJournalposterMedDirektelenke = (filters?: Filters) => {

  let returnObject = {
    lenketJournalpost: {} as JournalpostProps,
    resterendeJournalposter: [] as JournalpostProps[]
  }
  let journalposter = journalposterMedDirektelenkeAtom.get();

  if (filters?.journalpostid) {
    let tempJournalpost;
    tempJournalpost = journalposter.filter((journalpost) => {
      return journalpost.journalpostId === filters.journalpostid;
    });
    returnObject.lenketJournalpost = tempJournalpost && tempJournalpost[0];

    returnObject.resterendeJournalposter = journalposter.filter((journalpost) => {
      return journalpost.journalpostId !== filters.journalpostid;
    });
  }

  if(filters?.order) {
    if(filters.order === "asc") {
      returnObject.resterendeJournalposter.sort(sortByOpprettetAsc)
    }
    if(filters.order === "desc") {
      returnObject.resterendeJournalposter.sort(sortByOpprettetDesc)
    }
  }

  return returnObject;
}