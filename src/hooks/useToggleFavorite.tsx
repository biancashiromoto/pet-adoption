import { Context } from "@/context";
import { Pet } from "@/types/Pet.type";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

const useToggleFavorite = () => {
  const { setPets, speciesFilter } = useContext(Context);
  const queryClient = useQueryClient();

  const toggleFavorite = (id: Pet["id"]) => {
    setPets((prevPets: Pet[]) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === id) {
          return { ...pet, isFavorite: !pet.isFavorite };
        }
        return pet;
      });

      queryClient.setQueryData<Pet[]>(["fetchedPets", speciesFilter], () => {
        return updatedPets;
      });

      return updatedPets;
    });
  };

  return { toggleFavorite };
};

export default useToggleFavorite;
