// useFavorites.ts
import { useContext } from 'react';
import { Utils } from '../services/Utils';
import { Context } from '../context';
import { PetData } from '../types/PetData';
import { Pets } from '../context/Provider';

const utils = new Utils();

const useFavorites = () => {
  const { setDisplayedPets } = useContext(Context);

  const toggleFavorite = (id: PetData['id']) => {
    setDisplayedPets((prevPets: Pets) => {
      const updatedDogs = prevPets.dogs.map(pet => {
        if (pet.id === id) {
          return { ...pet, isFavorite: !pet.isFavorite };
        }
        return pet;
      });

      const updatedCats = prevPets.cats.map(pet => {
        if (pet.id === id) {
          return { ...pet, isFavorite: !pet.isFavorite };
        }
        return pet;
      });

      utils.setLocalStorage('pets', { ...prevPets, dogs: updatedDogs, cats: updatedCats });
      return { dogs: updatedDogs, cats: updatedCats };
    });
  };

  return { toggleFavorite };
};

export default useFavorites;
