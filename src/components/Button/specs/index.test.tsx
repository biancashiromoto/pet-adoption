import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "..";
import { describe, it, expect, vi } from "vitest";
import { ButtonRootProps } from "../index.types";

describe("Button component", () => {
  const mockOnClick = vi.fn();
  const mockProps: ButtonRootProps = {
    disabled: false,
    onClick: mockOnClick,
  };

  it("should be correctly rendered", () => {
    render(
      <Button.Root {...mockProps}>
        <Button.Label label="label" />
      </Button.Root>
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    render(<Button.Root {...mockProps} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
