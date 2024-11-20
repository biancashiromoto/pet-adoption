import { useContext, useEffect } from "react";
import { Context } from "@/context";
import { Pet } from "@/types/Pet";

const useFilter = () => {
  const {
    pets,
    setDisplayedPets,
    speciesFilter,
    favoritesFilter,
    orderFilter,
  } = useContext(Context);

  const filterBySpecies = (pets: Pet[]) => {
    return pets.filter((pet) => pet.species === speciesFilter);
  };

  const filterByFavorites = (pets: Pet[]) => {
    if (favoritesFilter === "favorite status") return pets;
    return favoritesFilter === "favorites"
      ? pets.filter((pet) => pet.isFavorite)
      : pets.filter((pet) => !pet.isFavorite);
  };

  const sortByAge = (pets: Pet[]) => {
    if (orderFilter === "order by") return pets;
    return [...pets].sort((a, b) => {
      if (a.age === undefined || b.age === undefined) return 0;
      return orderFilter === "younger" ? a.age - b.age : b.age - a.age;
    });
  };

  useEffect(() => {
    if (!pets || pets.length === 0) return;

    let filteredPets = filterBySpecies(pets);
    filteredPets = filterByFavorites(filteredPets);
    filteredPets = sortByAge(filteredPets);

    setDisplayedPets(filteredPets);
  }, [pets, speciesFilter, favoritesFilter, orderFilter]);

  return { pets };
};

export default useFilter;
