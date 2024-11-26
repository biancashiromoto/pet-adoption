import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "@/pages/Home";
import { Context } from "@/context";
import { ContextProps } from "@/context/index.types";
import { petsMock } from "@/tests/mocks";
import useFetchPets from "@/hooks/useFetchPets";
import { Pet } from "@/types/Pet.type";
import { BrowserRouter } from "react-router-dom";

vi.mock("@/helpers/Utils", () => {
  return {
    Utils: vi.fn().mockImplementation(() => ({
      setLocalStorage: vi.fn(),
    })),
  };
});

vi.mock("@/hooks/useFetchPets", () => ({
  default: vi.fn(() => ({
    isLoadingOrFetching: false,
    error: null,
    data: petsMock,
    refetch: vi.fn(),
  })),
}));

vi.mock("@/hooks/useFilter", () => ({
  default: vi.fn(),
}));

vi.mock("@/hooks/useEscapeKeyClose", () => ({
  default: vi.fn(),
}));

vi.mock("@/hooks/useUpdatePageTitle", () => ({
  default: vi.fn(),
}));

describe("Home Page", () => {
  const mockRefetch = vi.fn();

  const cats = petsMock.filter((pet: Pet) => pet.species === "cat");
  const dogs = petsMock.filter((pet: Pet) => pet.species === "dog");

  const mockContext = {
    pets: cats,
    selectedPet: [cats[0]],
    displayedPets: cats,
    showAdoptionModal: false,
    setShowAdoptionModal: vi.fn(),
    showUpdatePetsModal: false,
    setShowUpdatePetsModal: vi.fn(),
    showNotice: false,
  } as unknown as ContextProps;

  const renderHomePage = (
    isLoading: boolean = false,
    error: string | null = null,
    pets: Pet[] = cats,
    mockContextValue = mockContext
  ) => {
    (useFetchPets as any).mockReturnValue({
      isLoadingOrFetching: isLoading,
      error: error ? new Error(error) : null,
      data: pets,
      refetch: mockRefetch,
    });
    return render(
      <Context.Provider value={mockContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Context.Provider>
    );
  };

  afterEach(() => vi.clearAllMocks());

  it("should display error message if useFetchPets returns an error", () => {
    renderHomePage(false, "error fetching pets");
    expect(screen.getByText(/error: error fetching pets/i));
  });

  it("displays loader when isLoadingOrFetching is true", () => {
    renderHomePage(true);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.queryByTestId("pet-list")).not.toBeInTheDocument();
  });

  it("displays adoption modal if showAdoptionModal is true", () => {
    renderHomePage(false, null, cats, {
      ...mockContext,
      showAdoptionModal: true,
    });

    expect(screen.getByTestId("modal")).toHaveTextContent(
      `Would you like to adopt ${mockContext.selectedPet[0].name}?`
    );
  });

  it("displays update pets modal if showUpdatePetsModal is true", () => {
    renderHomePage(false, null, cats, {
      ...mockContext,
      showUpdatePetsModal: true,
    });

    expect(screen.getByTestId("modal")).toHaveTextContent(
      /Updating pets will remove the current list and fetch new ones. Do you want to continue?/i
    );
  });
});
