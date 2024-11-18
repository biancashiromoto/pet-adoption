import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Notice from "..";

describe("Modal component", () => {
  beforeEach(() => {
    render(
      <Notice>
        <h2>Notice</h2>
      </Notice>
    );
  });

  it("should be correctly rendered", () => {
    expect(
      screen.getByRole("heading", { name: /notice/i })
    ).toBeInTheDocument();
  });

  it("should not be in the screen after it is closed", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByTestId("notice")).not.toBeInTheDocument();
  });
});
