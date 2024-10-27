// Provider.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Context } from ".";
import Provider from "./Provider";
import { describe, it, expect } from "vitest";
import { useContext } from "react";

const TestComponent = () => {
  const {
    isLoading,
    setIsLoading,
    speciesFilter,
    setSpeciesFilter,
    error,
    setError,
  } = useContext(Context);

  return (
    <>
      <p data-testid="isLoading">{String(isLoading)}</p>
      <p data-testid="speciesFilter">{speciesFilter}</p>
      <p data-testid="error">{error}</p>
      <button onClick={() => setIsLoading(true)} data-testid="setLoading">
        Set Loading
      </button>
      <button onClick={() => setSpeciesFilter("dog")} data-testid="setSpecies">
        Set Species Filter
      </button>
      <button
        onClick={() => setError("An error occurred")}
        data-testid="setError"
      >
        Set Error
      </button>
    </>
  );
};

describe("Provider component", () => {
  it("should provide default context values", () => {
    render(
      <Provider>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByTestId("isLoading").textContent).toBe("false");
    expect(screen.getByTestId("speciesFilter").textContent).toBe("all");
    expect(screen.getByTestId("error").textContent).toBe("");
  });

  it("should update context values when actions are triggered", () => {
    render(
      <Provider>
        <TestComponent />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("setLoading"));
    fireEvent.click(screen.getByTestId("setSpecies"));
    fireEvent.click(screen.getByTestId("setError"));

    expect(screen.getByTestId("isLoading").textContent).toBe("true");
    expect(screen.getByTestId("speciesFilter").textContent).toBe("dog");
    expect(screen.getByTestId("error").textContent).toBe("An error occurred");
  });
});
