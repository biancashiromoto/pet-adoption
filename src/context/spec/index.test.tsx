import React from "react";
import { render, screen } from "@testing-library/react";
import { Context } from "..";
import { ContextProps } from "../index.types";
import { petsMock } from "@/tests/mocks";

describe("Provider Component", () => {
  const mockContext = {
    pets: petsMock,
    displayedPets: petsMock,
    selectedPet: [petsMock[0]],
    showAdoptionModal: false,
    showUpdatePetsModal: false,
    speciesFilter: "cat",
    orderFilter: "order by",
    favoritesFilter: "favorite status",
    showNotice: true,
    dontShowHomePageNoticeAgain: false,
    favoriteRef: null,
    orderRef: null,
    setPets: vi.fn(),
    setDisplayedPets: vi.fn(),
    setSelectedPet: vi.fn(),
    setShowAdoptionModal: vi.fn(),
    setShowUpdatePetsModal: vi.fn(),
    setSpeciesFilter: vi.fn(),
    setOrderFilter: vi.fn(),
    setFavoritesFilter: vi.fn(),
    setShowNotice: vi.fn(),
    setDontShowHomePageNoticeAgain: vi.fn(),
  } as unknown as ContextProps;
  it("should render children correctly", () => {
    render(
      <Context.Provider value={{} as unknown as ContextProps}>
        <div>Test Child</div>
      </Context.Provider>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should provide correct initial context values", () => {
    let contextValues: any = null;

    const TestComponent = () => {
      const context = React.useContext(Context);
      contextValues = context;
      return null;
    };

    render(
      <Context.Provider value={mockContext}>
        <TestComponent />
      </Context.Provider>
    );

    expect(contextValues.pets).toEqual(petsMock);
    expect(contextValues.displayedPets).toEqual(petsMock);
    expect(contextValues.selectedPet).toEqual([petsMock[0]]);
    expect(contextValues.showAdoptionModal).toBe(false);
    expect(contextValues.showUpdatePetsModal).toBe(false);
    expect(contextValues.speciesFilter).toBe("cat");
    expect(contextValues.orderFilter).toBe("order by");
    expect(contextValues.favoritesFilter).toBe("favorite status");
    expect(contextValues.showNotice).toBe(true);
    expect(contextValues.dontShowHomePageNoticeAgain).toBe(false);
  });

  it("should update context state values correctly", () => {
    let contextValues: any = null;

    const TestComponent = () => {
      const context = React.useContext(Context);
      contextValues = context;
      return null;
    };

    const { rerender } = render(
      <Context.Provider value={mockContext}>
        <TestComponent />
      </Context.Provider>
    );

    contextValues.setPets([]);
    contextValues.setDisplayedPets([]);
    contextValues.setSelectedPet([]);
    contextValues.setShowAdoptionModal(true);
    contextValues.setShowUpdatePetsModal(true);
    contextValues.setSpeciesFilter("dog");
    contextValues.setOrderFilter("older");
    contextValues.setFavoritesFilter("favorites");
    contextValues.setShowNotice(false);
    contextValues.setDontShowHomePageNoticeAgain(true);

    rerender(
      <Context.Provider value={mockContext}>
        <div>Test Child</div>
      </Context.Provider>
    );

    expect(contextValues.pets).toEqual(mockContext.pets);
    expect(contextValues.displayedPets).toEqual(mockContext.displayedPets);
    expect(contextValues.selectedPet).toEqual(mockContext.selectedPet);
    expect(contextValues.showAdoptionModal).toBe(mockContext.showAdoptionModal);
    expect(contextValues.showUpdatePetsModal).toBe(
      mockContext.showUpdatePetsModal
    );
    expect(contextValues.speciesFilter).toBe(mockContext.speciesFilter);
    expect(contextValues.orderFilter).toBe(mockContext.orderFilter);
    expect(contextValues.favoritesFilter).toBe(mockContext.favoritesFilter);
    expect(contextValues.showNotice).toBe(mockContext.showNotice);
    expect(contextValues.dontShowHomePageNoticeAgain).toBe(
      mockContext.dontShowHomePageNoticeAgain
    );
  });
});
