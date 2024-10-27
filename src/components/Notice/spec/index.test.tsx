import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Notice from "..";

describe("Modal component", () => {
  const setShowNotice = vi.fn();

  beforeEach(() => {
    render(
      <Notice setShowNotice={setShowNotice}>
        <h2>Notice</h2>
      </Notice>
    );
  });

  it("should be correctly rendered", () => {
    expect(
      screen.getByRole("heading", { name: /notice/i })
    ).toBeInTheDocument();
  });

  it("should call onClick function when button is clicked", async () => {
    fireEvent.click(screen.getByRole("button"));
    expect(setShowNotice).toHaveBeenCalledWith(false);
  });
});
