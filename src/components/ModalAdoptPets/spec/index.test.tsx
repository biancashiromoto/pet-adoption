import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { Context } from "../../../context";
import { ContextProps } from "../../../context/index.types";
import ModalAdoptPets from "..";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("ModalAdoptPets", () => {
  const setShowAdoptionModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockContext: ContextProps = {
    pets: [],
    setPets: vi.fn(),
    displayedPets: [],
    setDisplayedPets: vi.fn(),
    selectedPet: [
      {
        name: "Francisco",
        height: 10,
        width: 10,
        id: "2",
        isFavorite: true,
        url: "photo.jpg",
        age: 12,
        species: "cat",
      },
    ],
    setSelectedPet: vi.fn(),
    showAdoptionModal: true,
    setShowAdoptionModal,
    showUpdatePetsModal: false,
    setShowUpdatePetsModal: vi.fn(),
    speciesFilter: "all",
    setSpeciesFilter: vi.fn(),
    orderFilter: "none",
    setOrderFilter: vi.fn(),
    favoritesFilter: "all",
    setFavoritesFilter: vi.fn(),
    showNotice: false,
    setShowNotice: vi.fn(),
    dontShowNoticeAgain: false,
    setDontShowNoticeAgain: vi.fn(),
  };

  const renderModal = () =>
    render(
      <Context.Provider value={mockContext}>
        <ModalAdoptPets />
      </Context.Provider>
    );

  it("should render modal with the correct title and text", () => {
    renderModal();

    expect(
      screen.getByText(
        `Would you like to adopt ${mockContext.selectedPet[0].name}?`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("You will be redirected to the adoption form")
    ).toBeInTheDocument();
  });

  it('should close modal when clicking on "No"', () => {
    renderModal();
    fireEvent.click(screen.getByLabelText("No"));

    expect(setShowAdoptionModal).toHaveBeenCalledWith(false);
  });

  it("should navigate to the adoption form when clicking on 'Yes'", () => {
    renderModal();
    fireEvent.click(screen.getByLabelText("Yes"));

    expect(mockNavigate).toHaveBeenCalledWith("/adopt");
  });
});
