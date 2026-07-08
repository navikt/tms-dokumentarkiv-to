import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { JournalpostProps } from "../JournalpostInterfaces";

const logEvent = vi.fn();
vi.mock("@utils/client/analytics", () => ({
  logEvent: (...args: unknown[]) => logEvent(...args),
}));

import Journalpost from "./Journalpost";

const baseJournalpost: JournalpostProps = {
  journalpostId: "598134457",
  temakode: "AAP",
  temanavn: "Arbeidsavklaringspenger",
  tittel: "Søknad om dagpenger",
  avsender: "NAV Klageinstans",
  mottaker: "",
  journalposttype: "Inn",
  opprettet: "2024-03-15T12:00:00.000Z",
  dokument: {
    dokumentInfoId: "624887896",
    tittel: "Søknad om dagpenger",
    filtype: "PDF",
    filstorrelse: 12345,
    brukerHarTilgang: true,
    tilgangssperre: null,
  },
  vedlegg: [],
};

const renderJournalpost = (
  overrides: Partial<JournalpostProps> = {},
  isValgtRepresentant = false,
) =>
  render(
    <Journalpost
      journalpost={{ ...baseJournalpost, ...overrides }}
      language="nb"
      isValgtRepresentant={isValgtRepresentant}
    />,
  );

describe("Journalpost", () => {
  afterEach(() => {
    logEvent.mockReset();
  });

  it("should render the title as a link to the tema page", () => {
    renderJournalpost();

    const link = screen.getByRole("link", { name: "Søknad om dagpenger" });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("/dokumentarkiv/nb/tema/AAP/598134457"),
    );
  });

  it("should render the created date together with the avsender", () => {
    renderJournalpost();

    expect(
      screen.getByText("15.03.2024 - NAV Klageinstans"),
    ).toBeInTheDocument();
  });

  it("should fall back to the mottaker when there is no avsender", () => {
    renderJournalpost({ avsender: "", mottaker: "Ola Nordmann" });

    expect(screen.getByText("15.03.2024 - Ola Nordmann")).toBeInTheDocument();
  });

  it("should render only the date when neither avsender nor mottaker is set", () => {
    renderJournalpost({
      avsender: null as unknown as string,
      mottaker: null as unknown as string,
    });

    expect(screen.getByText("15.03.2024")).toBeInTheDocument();
  });

  it("should render the temanavn as a tag", () => {
    renderJournalpost();

    expect(screen.getByText("Arbeidsavklaringspenger")).toBeInTheDocument();
  });

  it("should append a fullmakt query param when viewing as a representative", () => {
    renderJournalpost({}, true);

    const link = screen.getByRole("link", { name: "Søknad om dagpenger" });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("?fullmakt=true"),
    );
  });

  it("should log an analytics event when the link is clicked", () => {
    renderJournalpost();

    fireEvent.click(screen.getByRole("link", { name: "Søknad om dagpenger" }));

    expect(logEvent).toHaveBeenCalledWith(
      "Journalpostlenke",
      "Arbeidsavklaringspenger",
    );
  });
});
