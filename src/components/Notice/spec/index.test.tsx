import { describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Notice from "..";

describe("Notice component", () => {
  it("should be correctly rendered", () => {
    const setShowNoticeMock = vi.fn();
    render(
      <Notice setShowNotice={setShowNoticeMock}>
        <p>Notice</p>
      </Notice>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText(/notice/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(setShowNoticeMock).toHaveBeenCalledWith(false);
  });
});
