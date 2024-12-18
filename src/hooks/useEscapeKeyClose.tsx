import { useContext, useEffect } from "react";
import { Context } from "@/context";

const useEscapeKeyClose = () => {
  const {
    showAdoptionModal,
    setShowAdoptionModal,
    showUpdatePetsModal,
    setShowUpdatePetsModal,
    selectedPets,
  } = useContext(Context);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showAdoptionModal) {
          setShowAdoptionModal(false);
          document.title = `Adopt ${selectedPets[0].name} | Pet Adoption`;
        }
        if (showUpdatePetsModal) {
          setShowUpdatePetsModal(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAdoptionModal, showUpdatePetsModal, selectedPets]);
};

export default useEscapeKeyClose;
