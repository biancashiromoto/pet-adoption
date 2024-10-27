import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Filter from "..";

describe("Filter component", () => {
  it("should be correctly rendered", () => {
    const options = ["none", "older", "younger"];

    render(
      <Filter
        id="order-by-age"
        items={options}
        label="Order by age:"
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText(/order by age/i)).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByRole("option", { name: option }));
    });
  });
});
