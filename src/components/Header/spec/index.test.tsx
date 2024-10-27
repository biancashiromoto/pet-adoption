import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "..";

describe("Header component", () => {
  it("should be correctly rendered", () => {
    render(<Header />);
    expect(screen.getByText("Pet adoption")).toBeInTheDocument();
  });
});
