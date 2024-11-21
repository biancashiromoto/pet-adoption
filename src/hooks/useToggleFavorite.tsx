import { Context } from "@/context";
import { Pet } from "@/types/Pet.type";
import { useContext } from "react";

const useToggleFavorite = () => {
  const { setPets } = useContext(Context);
  const toggleFavorite = (id: Pet["id"]) => {
    setPets((prevPets: Pet[]) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === id) {
          return { ...pet, isFavorite: !pet.isFavorite };
        }
        return pet;
      });

      return updatedPets;
    });
  };

  return { toggleFavorite };
};

export default useToggleFavorite;
