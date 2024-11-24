import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "..";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ContextProps } from "@/context/index.types";
import { Context } from "@/context";

let setShowUpdatePetsModalMock = vi.fn();
const mockContext = {
  setShowUpdatePetsModal: setShowUpdatePetsModalMock,
} as unknown as ContextProps;

describe("Header component", () => {
  it("should be correctly rendered", () => {
    render(
      <BrowserRouter>
        <Context.Provider value={mockContext}>
          <Header />
        </Context.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Pet adoption")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    links.forEach((link: HTMLElement) => {
      expect(link).toHaveAttribute("href", "/");
      expect(link).toHaveAttribute("aria-label", "Return to Home page");
    });
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Update pets"
    );

    fireEvent.click(screen.getByRole("button"));
    expect(setShowUpdatePetsModalMock).toHaveBeenCalledWith(true);
  });

  test("renders Return to Home link when not on the root path", () => {
    render(
      <MemoryRouter initialEntries={["/some-path"]}>
        <Context.Provider value={mockContext}>
          <Header />
        </Context.Provider>
      </MemoryRouter>
    );

    const returnLink = screen.getAllByRole("link")[1];
    expect(returnLink).toBeInTheDocument();

    const updatePetsButton = screen.queryByRole("button");
    expect(updatePetsButton).not.toBeInTheDocument();
  });
});
