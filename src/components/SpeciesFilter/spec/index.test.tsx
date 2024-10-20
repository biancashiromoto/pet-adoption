import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import SpeciesFilter from "..";
import { Context } from "../../../context";
import { ContextProps } from "../../../context/index.types";

const setSpecies = vi.fn(); 
const setShowAdoptionModal = vi.fn();

describe('SpeciesFilter component - initially set to cats', () => {
  const mockContextValue = {
    species: 'cats',
    setSpecies,
    setShowAdoptionModal,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Context.Provider value={mockContextValue as unknown as ContextProps}>
        <SpeciesFilter />
      </Context.Provider>
    );
  });

  it('should be correctly rendered', () => {
    const inputs = screen.getAllByRole('radio');
    expect(inputs[0]).toHaveAttribute("id", "cats");
    expect(inputs[1]).toHaveAttribute("id", "dogs");
  });

  it('should toggle species to dogs', async () => {
    fireEvent.click(screen.getByLabelText(/dogs/i));
    expect(setSpecies).toHaveBeenCalledWith('dogs');
    screen.debug()
  });
});

describe('SpeciesFilter component - initially set to dogs', () => {
  const mockContextValue = {
    species: 'dogs',
    setSpecies,
    setShowAdoptionModal,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <Context.Provider value={mockContextValue as unknown as ContextProps}>
        <SpeciesFilter />
      </Context.Provider>
    );
  });

  it('should toggle species to dogs', async () => {
    fireEvent.click(screen.getByLabelText(/cats/i));
    expect(setSpecies).toHaveBeenCalledWith('cats');
    screen.debug()
  });
});
