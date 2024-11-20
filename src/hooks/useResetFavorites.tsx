import { Context } from "@/context";
import { Pet } from "@/types/Pet";
import { useContext } from "react";

const useResetFavorites = () => {
  const { pets, setPets, setDisplayedPets } = useContext(Context);

  const resetFavorites = () => {
    const updatedPets = pets.map((pet: Pet) => ({
      ...pet,
      isFavorite: false,
    }));
    setPets(updatedPets);
    setDisplayedPets(updatedPets);
  };

  return { resetFavorites };
};

export default useResetFavorites;
