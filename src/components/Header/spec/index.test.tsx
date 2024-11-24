import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "..";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Context } from "@/context";
import { ContextProps } from "@/context/index.types";

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("Header component", () => {
  const setShowUpdatePetsModalMock = vi.fn();

  const renderComponent = (pathname: string = "/") => {
    (useLocation as any).mockReturnValue({ pathname });
    render(
      <Context.Provider
        value={
          {
            setShowUpdatePetsModal: setShowUpdatePetsModalMock,
          } as unknown as ContextProps
        }
      >
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Context.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be correctly rendered", () => {
    renderComponent();
    expect(screen.getByText("Pet adoption")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("logo").getAttribute("height")).toEqual("36");
    expect(screen.getByTestId("logo").getAttribute("width")).toEqual("36");
    expect(screen.queryByTestId("link__return")).not.toBeInTheDocument();
  });

  it("should call setShowUpdatePetsModal when button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button"));
    expect(setShowUpdatePetsModalMock).toHaveBeenCalledWith(true);
  });

  it("should render two buttons to return to Home page if pathname is not '/'", () => {
    renderComponent("/test");

    const returnButtons = screen.getAllByLabelText(/return to home page/i);
    expect(returnButtons.length).toEqual(2);
  });
});
