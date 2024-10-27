import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Modal from "..";

describe("Modal component", () => {
  it("should be correctly rendered", () => {
    render(
      <Modal title="Modal title" text="Modal text">
        <span>Modal child</span>
      </Modal>
    );
    expect(
      screen.getByRole("heading", { name: /modal title/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/modal text/i)).toBeInTheDocument();
    expect(screen.getByText(/modal child/i)).toBeInTheDocument();
  });
});
