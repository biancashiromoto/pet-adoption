import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import ModalUpdatePets from "..";
import { Context } from "../../../context";
import { ContextProps } from "../../../context/index.types";

describe("ModalUpdatePets", () => {
  const setShowUpdatePetsModal = vi.fn();
  const refetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockContext = {
    showUpdatePetsModal: false,
    setShowUpdatePetsModal,
  } as unknown as ContextProps;

  const renderModal = () =>
    render(
      <Context.Provider value={mockContext}>
        <ModalUpdatePets refetch={refetch} />
      </Context.Provider>
    );

  it("should render modal with the correct title and text", () => {
    renderModal();

    expect(screen.getByText("Update pets?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Updating pets will remove the current list and fetch new ones. Do you want to continue?"
      )
    ).toBeInTheDocument();
  });

  it("should call refetch and close modal when clicking 'Yes'", () => {
    renderModal();

    fireEvent.click(screen.getByLabelText("Yes"));

    expect(localStorage.getItem("pets")).toBeNull();
    expect(refetch).toHaveBeenCalled();
    expect(setShowUpdatePetsModal).toHaveBeenCalledWith(false);
  });

  it("should close modal without calling refetch when clicking 'No'", () => {
    renderModal();
    fireEvent.click(screen.getByLabelText("No"));

    expect(refetch).not.toHaveBeenCalled();
    expect(setShowUpdatePetsModal).toHaveBeenCalledWith(false);
  });
});
