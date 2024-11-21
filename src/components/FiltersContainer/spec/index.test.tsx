import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Context } from "../../../context";
import FiltersContainer from "..";
import { ContextProps } from "../../../context/index.types";
import { petsMock } from "@/tests/mocks";
import useResetFavorites from "@/hooks/useResetFavorites";
import useClearFilters from "@/hooks/useClearFilters";
import { Pet } from "@/types/Pet.type";

vi.mock("@/hooks/useResetFavorites", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    resetFavorites: vi.fn(),
  })),
}));

vi.mock("@/hooks/useClearFilters", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    clearFilters: vi.fn(),
  })),
}));

describe("FiltersContainer component", () => {
  const setFavoritesFilter = vi.fn();
  const setOrderFilter = vi.fn();
  const setSpeciesFilter = vi.fn();

  const renderFiltersContainer = (species: Pet["species"] = "cat") => {
    const { rerender } = render(
      <Context.Provider
        value={
          {
            pets: petsMock,
            setFavoritesFilter,
            setOrderFilter,
            setSpeciesFilter,
            speciesFilter: species,
            orderRef: { current: null },
            favoriteRef: { current: null },
            setPets: vi.fn(),
            setDisplayedPets: vi.fn(),
          } as unknown as ContextProps
        }
      >
        <FiltersContainer />
      </Context.Provider>
    );

    return { rerender };
  };

  it("should render correctly", () => {
    renderFiltersContainer();
    expect(screen.getByLabelText("Clear filters")).toBeInTheDocument();
    expect(screen.getByLabelText("Reset favorites")).toBeInTheDocument();
    expect(screen.getByLabelText("Cats")).toBeInTheDocument();
    expect(screen.getByLabelText("Dogs")).toBeInTheDocument();
  });

  it("should call setSpeciesFilter and change species to 'Dog' when dog species is selected", () => {
    renderFiltersContainer();

    fireEvent.click(screen.getByLabelText("Dogs"));
    expect(setSpeciesFilter).toHaveBeenCalledWith("dog");
  });

  it("should call setSpeciesFilter and change species to 'Cat' when cat species is selected", () => {
    renderFiltersContainer("dog");

    fireEvent.click(screen.getByLabelText("Cats"));
    expect(setSpeciesFilter).toHaveBeenCalledWith("cat");
  });

  it("should call setSpeciesFilter and change species to 'Dog' when dog species is selected using keyboard", () => {
    renderFiltersContainer();

    const dogsLabel = screen.getByLabelText("Dogs");
    dogsLabel.focus();
    fireEvent.keyDown(dogsLabel, { key: "Enter", code: "Enter" });

    expect(setSpeciesFilter).toHaveBeenCalledWith("dog");
  });

  it("should call setSpeciesFilter and change species to 'Cat' when dog species is selected using keyboard", () => {
    renderFiltersContainer();

    const catsLabel = screen.getByLabelText("Cats");
    catsLabel.focus();
    fireEvent.keyDown(catsLabel, { key: "Enter", code: "Enter" });

    expect(setSpeciesFilter).toHaveBeenCalledWith("cat");
  });

  it("should call setOrderFilter when a order is selected", () => {
    renderFiltersContainer();
    const orderSelect = screen.getAllByTestId("filter-select")[0];

    fireEvent.change(orderSelect.children[1], {
      target: { value: "younger" },
    });
    expect(setOrderFilter).toHaveBeenCalledWith("younger");
  });

  it("should call setFavoritesFilter when a favorite status is selected", () => {
    renderFiltersContainer();
    const favoritesSelect = screen.getAllByTestId("filter-select")[1];

    fireEvent.change(favoritesSelect.children[1], {
      target: { value: "favorites" },
    });
    expect(setFavoritesFilter).toHaveBeenCalledWith("favorites");
  });

  it("should call clearFilters when Clear filter button is clicked", () => {
    const clearFiltersMock = vi.fn();
    (useClearFilters as any).mockReturnValue({
      clearFilters: clearFiltersMock,
    });

    renderFiltersContainer();

    fireEvent.click(screen.getByLabelText("Clear filters"));
    expect(clearFiltersMock).toHaveBeenCalled();
  });

  it("should call resetFavorites when Reset favorites button is clicked", () => {
    const resetFavoritesMock = vi.fn();
    (useResetFavorites as any).mockReturnValue({
      resetFavorites: resetFavoritesMock,
    });

    renderFiltersContainer();
    fireEvent.click(screen.getByLabelText("Reset favorites"));

    expect(resetFavoritesMock).toHaveBeenCalled();
  });
});
