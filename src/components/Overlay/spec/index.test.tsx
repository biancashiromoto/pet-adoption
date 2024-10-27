import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Overlay from "..";

describe("Card component", () => {
  const openModal = vi.fn();

  it("should call openModal function when clicked", () => {
    render(<Overlay openModal={openModal} />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Close modal"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(openModal).toHaveBeenCalledWith(false);
  });
});
