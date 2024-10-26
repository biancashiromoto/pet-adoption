import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PetData } from "../../../types/PetData";
import { Context } from "../../../context";
import Card from "..";
import { ContextProps } from "../../../context/index.types";

const setSelectedPet = vi.fn();
const setShowAdoptionModal = vi.fn();

const pet: PetData = {
  id: "1",
  name: "Luna",
  age: 3,
  url: "https://example.com/cat.jpg",
  isFavorite: false,
  height: 10,
  width: 10,
  species: "cat",
};

const mockContextValue = {
  setSelectedPet,
  setShowAdoptionModal,
};

describe("Card component", () => {
  const toggleFavorite = vi.fn();

  const renderCard = (pet: PetData) => {
    return render(
      <Context.Provider value={mockContextValue as unknown as ContextProps}>
        <Card pet={pet} toggleFavorite={toggleFavorite} />
      </Context.Provider>
    );
  };

  it("should display pet information correctly", () => {
    renderCard(pet);
    const petName = pet.name ?? "Unknown";
    expect(
      screen.getByRole("img", { name: /random picture of a cat/i })
    ).toHaveAttribute("src", pet.url);
    expect(screen.getByText(petName)).toBeInTheDocument();
    expect(screen.getByText(/Age:/i)).toHaveTextContent(`Age: ${pet.age}`);
  });

  it("should call setSelectedPet and setShowAdoptionModal when card is clicked", () => {
    renderCard(pet);

    const card = screen.getByRole("article");
    fireEvent.click(card);

    expect(setSelectedPet).toHaveBeenCalledWith([pet]);
    expect(setShowAdoptionModal).toHaveBeenCalledWith(true);
  });

  it("should call toggleFavorite when the favorite button is clicked", () => {
    renderCard(pet);

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(toggleFavorite).toHaveBeenCalledWith(pet.id);
  });

  it("should display the correct favorite icon", () => {
    renderCard(pet);
    expect(screen.getByTestId("FaRegHeart")).toBeInTheDocument();

    const favoritePet = { ...pet, isFavorite: true };
    renderCard(favoritePet);
    expect(screen.getByTestId("FaHeart")).toBeInTheDocument();
  });
});
