import { render, screen } from "@testing-library/react";
import Footer from "..";

describe("Footer component", () => {
  it("should be correctly rendered", () => {
    render(<Footer />);
    screen.debug();
    expect(
      screen.getByText(/developed by Bianca Shiromoto/i)
    ).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("aria-label", "LinkedIn");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/bshiromoto/"
    );
    expect(links[1]).toHaveAttribute("aria-label", "GitHub");
    expect(links[1]).toHaveAttribute(
      "href",
      "https://github.com/biancashiromoto"
    );
  });
});
