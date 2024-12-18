import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card, { CardProps } from "..";
import { petsMock } from "@/tests/mocks";
import { Context } from "@/context";
import { ContextProps } from "@/context/index.types";

const toggleFavoriteMock = vi.fn();

vi.mock("@/hooks/useToggleFavorite", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    toggleFavorite: toggleFavoriteMock,
  })),
}));

const setShowAdoptionModalMock = vi.fn();
const setSelectedPetsMock = vi.fn();

describe("Card component", () => {
  const mockProps = {
    pet: petsMock[0],
  };

  const renderCard = (props: CardProps) => {
    render(
      <Context.Provider
        value={
          {
            setSelectedPets: setSelectedPetsMock,
            setShowAdoptionModal: setShowAdoptionModalMock,
          } as unknown as ContextProps
        }
      >
        <Card {...props} />
      </Context.Provider>
    );
  };

  it("should be correctly rendered", () => {
    renderCard(mockProps);
    expect(
      screen.getByRole("heading", { name: petsMock[0].name })
    ).toBeInTheDocument();
    expect(screen.getByText(`Age: ${petsMock[0].age}`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", petsMock[0].url);
    expect(screen.getByTestId("heart__unfilled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__filled")).not.toBeInTheDocument();
  });

  it("should call setSelectedPets and setShowModal functions when card is clicked", () => {
    renderCard(mockProps);
    fireEvent.click(screen.getByRole("article"));
    expect(setShowAdoptionModalMock).toHaveBeenCalledWith(true);
    expect(setSelectedPetsMock).toHaveBeenCalledTimes(1);
  });

  it("should call toggleFavorite function when heart icon is clicked", () => {
    const { rerender } = render(<Card {...mockProps} />);

    expect(screen.getByTestId("heart__unfilled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__filled")).not.toBeInTheDocument();

    const favoriteButton = screen.getAllByTestId("favorite-button")[0];
    fireEvent.click(favoriteButton);
    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(petsMock[0].id);

    const newMockProps = {
      ...mockProps,
      pet: { ...petsMock[0], isFavorite: true },
    };

    rerender(<Card {...{ ...newMockProps }} />);

    expect(screen.getByTestId("heart__filled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__unfilled")).not.toBeInTheDocument();
  });
});
