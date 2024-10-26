import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Header from "..";

describe("Header component", () => {
  it("should be correctly rendered", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveTextContent(/pet adoption/i);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/src/assets/logo.svg"
    );
  });
});
