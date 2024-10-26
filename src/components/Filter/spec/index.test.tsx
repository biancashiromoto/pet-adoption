import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "..";
import { FilterProps } from "../index.types";

describe("Filter component", () => {
  const mockOnChange = vi.fn();
  let mockProps = {
    id: "order-by-age",
    label: "Order by age",
    items: ["none", "older", "younger"],
    onChange: mockOnChange,
  };
  const renderFilter = (props: FilterProps = mockProps) => {
    return render(
      <Filter
        id={props.id}
        items={props.items}
        label={props.label}
        onChange={props.onChange}
      />
    );
  };

  it("should be correctly rendered", () => {
    renderFilter();
    expect(screen.getByLabelText(mockProps.label)).toBeInTheDocument();
    expect(screen.getByTestId("filter-select")).toHaveAttribute(
      "id",
      mockProps.id
    );
    const options = screen.getAllByRole("option");
    options.forEach((option, index) => {
      expect(option.textContent).toBe(mockProps.items[index]);
    });
  });

  it("should call mock onChange function when changed", () => {
    renderFilter();
    fireEvent.change(screen.getByTestId("filter-select"), {
      target: { value: mockProps.items[1] },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
