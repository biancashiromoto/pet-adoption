import { Context } from "@/context";
import { ContextProps } from "@/context/index.types";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PetList from "..";
import { petsMock } from "@/tests/mocks";
import { Pet } from "@/types/Pet.type";

describe("PetList component", () => {
  const cats = petsMock.filter((pet: Pet) => pet.species === "cat");
  const setPets = vi.fn();
  const setSelectedPet = vi.fn();
  const setShowAdoptionModal = vi.fn();
  const renderComponent = (displayedPets: Pet[] = cats) => {
    render(
      <Context.Provider
        value={
          {
            displayedPets,
            setSelectedPet,
            setPets,
            setShowAdoptionModal,
          } as unknown as ContextProps
        }
      >
        <BrowserRouter>
          <PetList />
        </BrowserRouter>
      </Context.Provider>
    );
  };

  afterEach(() => vi.clearAllMocks());

  it("should be correctly rendered", () => {
    renderComponent();
    const cards = screen.getAllByTestId("card");

    cards.forEach((card, index) => {
      expect(card.textContent).toMatch(cats[index].name as string);
      expect(card.textContent).toMatch(cats[index].age as unknown as string);
      expect(screen.getAllByRole("img")[index].getAttribute("src")).toBe(
        cats[0].url
      );
    });
  });

  it('should render "No pets found" title when displayedPets is an empty array', () => {
    renderComponent([]);
    expect(
      screen.getByRole("heading", { name: /no pets found/i })
    ).toBeInTheDocument();
  });

  it("should call toggleFavorite function when heart icon is clicked", () => {
    renderComponent();
    const favoriteButton = screen.getAllByTestId("favorite-button")[0];
    fireEvent.click(favoriteButton);
    expect(setPets).toHaveBeenCalledTimes(1);
  });

  it("should call setSelectedPet and setShowAdoptionModal when a pet card is clicked", () => {
    renderComponent();
    const cards = screen.getAllByTestId("card");

    expect(
      screen.getByTestId(
        `${cats[0].isFavorite ? "heart__filled" : "heart__unfilled"}`
      )
    ).toBeInTheDocument();
    fireEvent.click(cards[0]);
    expect(setSelectedPet).toHaveBeenCalledWith([cats[0]]);
    expect(setShowAdoptionModal).toHaveBeenCalledWith(true);
  });
});
