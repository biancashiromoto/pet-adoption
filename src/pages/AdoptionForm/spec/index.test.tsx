import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdoptionForm from "..";
import { Context } from "../../../context";
import { petsMock } from "@/tests/mocks";
import { ContextProps } from "@/context/index.types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("AdoptionForm Component", () => {
  const renderAdoptionForm = () => {
    return render(
      <Context.Provider
        value={
          {
            selectedPets: [petsMock[0]],
            showNotice: false,
            dontShowHomePageNoticeAgain: false,
          } as unknown as ContextProps
        }
      >
        <BrowserRouter>
          <AdoptionForm />
        </BrowserRouter>
      </Context.Provider>
    );
  };

  beforeEach(() => {
    renderAdoptionForm();
  });

  it("renders form fields and submit button", () => {
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birth date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.getByText(`You are filling the form to adopt ${petsMock[0].name}`)
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", petsMock[0].url);
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      `${petsMock[0].name}'s picture`
    );
  });

  it("shows the modal upon form submission", async () => {
    fireEvent.input(screen.getByLabelText(/First name/i), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByLabelText(/Last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByLabelText(/E-mail/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Phone number/i), {
      target: { value: "123456789" },
    });
    fireEvent.input(screen.getByLabelText(/Birth date/i), {
      target: { value: "1990-01-01" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText(/thank you for submitting/i)).toBeInTheDocument()
    );
    expect(
      screen.getByText(/we will contact you as soon as possible/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Ok"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("closes modal when 'Escape' is pressed", async () => {
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() =>
      expect(screen.getByText(/thank you for submitting/i)).toBeInTheDocument()
    );

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() =>
      expect(
        screen.queryByText(/thank you for submitting/i)
      ).not.toBeInTheDocument()
    );
  });

  it("shows 'Page not found' screen when no pet is selected", () => {
    render(
      <Context.Provider
        value={
          {
            selectedPets: [],
            dontShowHomePageNoticeAgain: false,
          } as unknown as ContextProps
        }
      >
        <BrowserRouter>
          <AdoptionForm />
        </BrowserRouter>
      </Context.Provider>
    );

    expect(screen.getByText("Oops...")).toBeInTheDocument();
    expect(screen.getByText("Page not found!")).toBeInTheDocument();
  });
});
