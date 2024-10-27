import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loader from "..";

describe("Loader component", () => {
  it("should be correctly rendered", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
