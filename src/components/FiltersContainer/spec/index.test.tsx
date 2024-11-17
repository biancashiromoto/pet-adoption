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
    expect(screen.getByLabelText("Clear filters")).toBeInTheDocument();
    expect(screen.getByLabelText("Reset favorites")).toBeInTheDocument();
  });

  it("should call setSpeciesFilter when a species is selected", () => {
    renderFiltersContainer();
    fireEvent.click(screen.getByText(/cats/i));
    expect(setSpeciesFilter).toHaveBeenCalledWith("cat");
  });

  it("should call setOrderFilter when a order is selected", () => {
    renderFiltersContainer();
    const orderSelect = screen.getAllByTestId("filter-select")[0];
    screen.debug(orderSelect);

    fireEvent.change(orderSelect.children[1], {
      target: { value: "younger" },
    });
    expect(setOrderFilter).toHaveBeenCalledWith("younger");
  });

  it("should call setFavoritesFilter when a favorite status is selected", () => {
    renderFiltersContainer();
    const favoritesSelect = screen.getAllByTestId("filter-select")[1];
    screen.debug(favoritesSelect);

    fireEvent.change(favoritesSelect.children[1], {
      target: { value: "favorites" },
    });
    expect(setFavoritesFilter).toHaveBeenCalledWith("favorites");
  });

  it("should call clearFilters when Clear filter button is clicked", () => {
    renderFiltersContainer();
    fireEvent.click(screen.getByLabelText("Clear filters"));
    expect(clearFilters).toHaveBeenCalled();
  });

  it("should call resetFavorites when Reset favorites button is clicked", () => {
    renderFiltersContainer();
    fireEvent.click(screen.getByLabelText("Reset favorites"));
    expect(resetFavorites).toHaveBeenCalled();
  });
});
