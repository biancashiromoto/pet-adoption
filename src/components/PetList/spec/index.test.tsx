import { Context } from "@/context";
import { ContextProps } from "@/context/index.types";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PetList from "..";
import { petsMock } from "@/tests/mocks";
import { Pet } from "@/types/Pet.type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

vi.mock("@/hooks/useFetchPets", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    isFetchingOrLoading: false,
  })),
}));

const queryClient = new QueryClient();

describe("PetList component", () => {
  const cats = petsMock.filter((pet: Pet) => pet.species === "cat");
  const setPets = vi.fn();
  const setSelectedPets = vi.fn();
  const setShowAdoptionModal = vi.fn();
  const renderComponent = (displayedPets: Pet[] = cats) => {
    render(
      <QueryClientProvider client={queryClient}>
        <Context.Provider
          value={
            {
              displayedPets,
              setSelectedPets,
              setPets,
              setShowAdoptionModal,
            } as unknown as ContextProps
          }
        >
          <BrowserRouter>
            <PetList />
          </BrowserRouter>
        </Context.Provider>
      </QueryClientProvider>
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
        cats[index].url
      );
    });
  });

  it('should render "No pets found" title when displayedPets is an empty array', () => {
    renderComponent([]);
    expect(
      screen.getByRole("heading", { name: /no pets found/i })
    ).toBeInTheDocument();
  });

  it("should call setSelectedPets and setShowAdoptionModal when a pet card is clicked", () => {
    renderComponent();
    const cards = screen.getAllByTestId("card");

    expect(
      screen.getAllByTestId(
        `${cats[0].isFavorite ? "heart__filled" : "heart__unfilled"}`
      )[0]
    ).toBeInTheDocument();
    fireEvent.click(cards[0]);
    expect(setSelectedPets).toHaveBeenCalledTimes(1);
    expect(setShowAdoptionModal).toHaveBeenCalledWith(true);
  });
});
