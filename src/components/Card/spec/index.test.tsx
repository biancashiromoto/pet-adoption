import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card, { CardProps } from "..";
import { Pet } from "../../../types/Pet";

const pet: Pet = {
  id: "_VcB1rc9l",
  url: "image.jpg",
  width: 10,
  height: 10,
  name: "Cleo",
  age: 5,
  species: "dog",
  isFavorite: false,
};
describe("Card component", () => {
  const setSelectedPet: vi.Mock = vi.fn();
  const setShowModal: vi.Mock = vi.fn();
  const toggleFavorite: vi.Mock = vi.fn();

  const mockProps = {
    pet,
    setSelectedPet: setSelectedPet,
    setShowModal: setShowModal,
    toggleFavorite: toggleFavorite,
  };

  const renderCard = (props: CardProps) => {
    render(<Card {...props} />);
  };

  it("should be correctly rendered", () => {
    renderCard(mockProps);
    expect(screen.getByRole("heading", { name: pet.name })).toBeInTheDocument();
    expect(screen.getByText(`Age: ${pet.age}`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", pet.url);
    expect(screen.getByTestId("heart__unfilled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__filled")).not.toBeInTheDocument();
  });

  it("should call setSelectedPet and setShowModal functions when card is clicked", () => {
    renderCard(mockProps);
    fireEvent.click(screen.getByRole("article"));
    expect(setShowModal).toHaveBeenCalledWith(true);
    expect(setSelectedPet).toHaveBeenCalledWith([pet]);
  });

  it("should toggle the favorite icon when heart icon is clicked", () => {
    const { rerender } = render(<Card {...mockProps} />);

    expect(screen.getByTestId("heart__unfilled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__filled")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(toggleFavorite).toHaveBeenCalledWith(pet.id);
    const newMockProps = { ...mockProps, pet: { ...pet, isFavorite: true } };
    rerender(<Card {...{ ...newMockProps }} />);

    expect(screen.getByTestId("heart__filled")).toBeInTheDocument();
    expect(screen.queryByTestId("heart__unfilled")).not.toBeInTheDocument();
  });
});
