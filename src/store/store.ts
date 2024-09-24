import type { JournalpostProps } from "@components/dokumentliste-med-sok/DokumentInterfaces";
import { atom } from "nanostores";

export const journalposterAtom = atom<JournalpostProps[]>([]);

export function setJournalposter(journalposter: JournalpostProps[]) {
  journalposterAtom.set(journalposter);
}