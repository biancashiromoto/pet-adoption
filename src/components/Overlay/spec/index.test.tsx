import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Overlay from "..";

describe("Overlay component", () => {
  it("should render correctly with the correct aria-label", () => {
    const openModalMock = vi.fn();
    render(<Overlay openModal={openModalMock} />);

    const overlay = screen.getByRole("button", { name: /close modal/i });
    expect(overlay).toBeInTheDocument();
  });

  it("should call openModal with false when clicked", () => {
    const openModalMock = vi.fn();
    render(<Overlay openModal={openModalMock} />);

    const overlay = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(overlay);

    expect(openModalMock).toHaveBeenCalledWith(false);
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });
});
