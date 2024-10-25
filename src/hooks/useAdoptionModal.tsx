import { useContext, useEffect } from "react";
import { Context } from "../context";

const useAdoptionModal = () => {
  const {
    selectedPet,
    showAdoptionModal,
    setShowAdoptionModal,
  } = useContext(Context);

  useEffect(() => {
    if (showAdoptionModal) {
      document.title = `Adopt ${selectedPet[0].name} | Pet Adoption`;
    } else {
      document.title = `Home | Pet Adoption`;
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdoptionModal]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (showAdoptionModal) {
        setShowAdoptionModal(false);
      }
    }
  };
}

export default useAdoptionModal;