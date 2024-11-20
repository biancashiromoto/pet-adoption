import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card, { CardProps } from "..";
import { Pet } from "../../../types/Pet.type";
import { pets } from "@/tests/mocks";

describe("Card component", () => {
  const setSelectedPet = vi.fn();
  const setShowModal = vi.fn();
  const toggleFavorite = vi.fn();

  const mockProps = {
    pet: pets[0],
    setSelectedPet: setSelectedPet,
    setShowModal: setShowModal,
    toggleFavorite: toggleFavorite,
  };

  const renderCard = (props: CardProps) => {
    render(<Card {...props} />);
  };

  it("should be correctly rendered", () => {
    renderCard(mockProps);
    expect(
      screen.getByRole("heading", { name: pets[0].name })
    ).toBeInTheDocument();
    expect(screen.getByText(`Age: ${pets[0].age}`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", pets[0].url);
    expect(screen.getByTestId("heart__unfilled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__filled")).not.toBeInTheDocument();
  });

  it("should call setSelectedPet and setShowModal functions when card is clicked", () => {
    renderCard(mockProps);
    fireEvent.click(screen.getByRole("article"));
    expect(setShowModal).toHaveBeenCalledWith(true);
    expect(setSelectedPet).toHaveBeenCalledWith([pets[0]]);
  });

  it("should toggle the favorite icon when heart icon is clicked", () => {
    const { rerender } = render(<Card {...mockProps} />);

    expect(screen.getByTestId("heart__unfilled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__filled")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(toggleFavorite).toHaveBeenCalledWith(pets[0].id);
    const newMockProps = {
      ...mockProps,
      pet: { ...pets[0], isFavorite: true },
    };
    rerender(<Card {...{ ...newMockProps }} />);

    expect(screen.getByTestId("heart__filled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__unfilled")).not.toBeInTheDocument();
  });
});
