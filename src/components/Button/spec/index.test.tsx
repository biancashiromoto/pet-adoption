import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "..";
describe("Button component", () => {
  const onClick = vi.fn();

  const renderButton = () => {
    render(
      <Button.Root onClick={onClick} ariaLabel="Button aria label">
        <Button.Label label="Button label" />
        <h2>Button text</h2>
      </Button.Root>
    );
  };

  it("should be correctly rendered", () => {
    renderButton();
    expect(screen.getByText(/button label/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Button aria label"
    );
    expect(
      screen.getByRole("heading", { name: /button text/i })
    ).toBeInTheDocument();
  });

  it("should call onClick function when clicked", () => {
    renderButton();
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
