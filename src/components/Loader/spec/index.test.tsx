import { render, screen } from "@testing-library/react";
import Loader from "..";

describe("Loader component", () => {
  it("should be correctly rendered", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/src/assets/loading.gif"
    );
  });
});
