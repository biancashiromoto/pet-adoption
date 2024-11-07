import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FiltersContainerProps } from "../index.types";
import { Context } from "../../../context";
import FiltersContainer from "..";
import { ContextProps } from "../../../context/index.types";

describe("FiltersContainer component", () => {
  const setFavoritesFilter = vi.fn();
  const setOrderFilter = vi.fn();
  const setSpeciesFilter = vi.fn();
  const clearFilters = vi.fn();
  const resetFavorites = vi.fn();

  const props: FiltersContainerProps = {
    speciesRef: { current: null },
    orderRef: { current: null },
    favoriteRef: { current: null },
    clearFilters,
    resetFavorites,
  };

  const renderFiltersContainer = () =>
    render(
      <Context.Provider
        value={
          {
            setFavoritesFilter,
            setOrderFilter,
            setSpeciesFilter,
          } as unknown as ContextProps
        }
      >
        <FiltersContainer {...props} />
      </Context.Provider>
    );

  it("should render correctly", () => {
    renderFiltersContainer();
    expect(screen.getByLabelText(/species/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/order/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/favorite status/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Clear filter")).toBeInTheDocument();
    expect(screen.getByLabelText("Reset favorites")).toBeInTheDocument();
  });

  it("should call setSpeciesFilter when a species is selected", () => {
    renderFiltersContainer();
    const speciesSelect = screen.getByLabelText(/species/i);
    fireEvent.change(speciesSelect, { target: { value: "cat" } });
    expect(setSpeciesFilter).toHaveBeenCalledWith("cat");
  });

  it("should call setOrderFilter when an order is selected", () => {
    renderFiltersContainer();
    const orderSelect = screen.getByLabelText(/order/i);
    fireEvent.change(orderSelect, { target: { value: "younger" } });
    expect(setOrderFilter).toHaveBeenCalledWith("younger");
  });

  it("should call setFavoritesFilter when a favorite status is selected", () => {
    renderFiltersContainer();
    const favoritesSelect = screen.getByLabelText(/favorite status/i);
    fireEvent.change(favoritesSelect, { target: { value: "favorites" } });
    expect(setFavoritesFilter).toHaveBeenCalledWith("favorites");
  });

  it("should call clearFilters when Clear filter button is clicked", () => {
    renderFiltersContainer();
    fireEvent.click(screen.getByLabelText("Clear filter"));
    expect(clearFilters).toHaveBeenCalled();
  });

  it("should call resetFavorites when Reset favorites button is clicked", () => {
    renderFiltersContainer();
    fireEvent.click(screen.getByLabelText("Reset favorites"));
    expect(resetFavorites).toHaveBeenCalled();
  });
});
