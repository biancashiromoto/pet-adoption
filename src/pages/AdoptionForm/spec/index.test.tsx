// AdoptionForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdoptionForm from "..";

vi.mock("react-router-dom", async () => {
  const original =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...original,
    useNavigate: () => vi.fn(),
  };
});

describe("AdoptionForm Component", () => {
  const renderAdoptionForm = () => {
    return render(
      <BrowserRouter>
        <AdoptionForm />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    renderAdoptionForm();
  });

  it("renders form fields and submit button", () => {
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birth date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows the modal upon form submission", async () => {
    fireEvent.input(screen.getByLabelText(/First name/i), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByLabelText(/Last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
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
});
