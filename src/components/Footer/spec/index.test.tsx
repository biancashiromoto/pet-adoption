import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Footer from "..";

describe("Footer component", () => {
  it("shoulld be correctly rendered", () => {
    render(<Footer />);

    expect(
      screen.getByText(/developed by bianca shiromoto/i)
    ).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/bshiromoto/"
    );
    expect(links[0]).toHaveAttribute("aria-label", "LinkedIn");
    expect(links[1]).toHaveAttribute(
      "href",
      "https://github.com/biancashiromoto"
    );
    expect(links[1]).toHaveAttribute("aria-label", "GitHub");
  });
});
