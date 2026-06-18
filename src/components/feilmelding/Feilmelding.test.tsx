import { setIsError } from "@store/store";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FeilMelding from "./Feilmelding";

describe("FeilMelding", () => {
  afterEach(() => {
    act(() => {
      setIsError(false);
    });
  });

  it("should render nothing when there is no error", () => {
    const { container } = render(<FeilMelding language="nb" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render the bokmål error alert when an error is set", () => {
    render(<FeilMelding language="nb" />);

    act(() => {
      setIsError(true);
    });

    expect(screen.getByText(/tekniske problemer/i)).toBeInTheDocument();
  });

  it("should render the english error message when an error is set", () => {
    render(<FeilMelding language="en" />);

    act(() => {
      setIsError(true);
    });

    expect(screen.getByText(/technical difficulties/i)).toBeInTheDocument();
  });
});
