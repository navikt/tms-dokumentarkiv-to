import type { JournalpostProps } from "@components/dokumentliste/DokumentInterfaces";
import { atom } from "nanostores";

export const journalposterAtom = atom<Array<JournalpostProps>>([]);

export const visibleJournalposter = atom<Array<JournalpostProps>>([])

export const searchInput = atom<string>("");