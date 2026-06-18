import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IngenJournalposter from "./IngenJournalposter";

describe("IngenJournalposter", () => {
  it("should render the bokmål empty state", () => {
    render(<IngenJournalposter language="nb" />);

    expect(
      screen.getByText("Ingen registrerte saker eller dokumenter å vise"),
    ).toBeInTheDocument();
  });

  it("should render the nynorsk empty state", () => {
    render(<IngenJournalposter language="nn" />);

    expect(
      screen.getByText("Ingen registrerte sakar eller dokument å vise"),
    ).toBeInTheDocument();
  });

  it("should render the english empty state", () => {
    render(<IngenJournalposter language="en" />);

    expect(
      screen.getByText("No registered cases or documents to show"),
    ).toBeInTheDocument();
  });
});
