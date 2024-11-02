import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "..";
import { BrowserRouter } from "react-router-dom";

describe("Header component", () => {
  it("should be correctly rendered", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText("Pet adoption")).toBeInTheDocument();
  });
});
