import { Context } from "@/context";
import { Favorites, OrderByAge } from "@/types/Filters.type";
import { Pet } from "@/types/Pet.type";
import { RefObject, useContext, useEffect } from "react";

const useClearFilters = () => {
  const {
    pets,
    speciesFilter,
    setDisplayedPets,
    setOrderFilter,
    setSpeciesFilter,
    setFavoritesFilter,
    orderRef,
    favoriteRef,
  } = useContext(Context);

  const updateRef = (
    ref: RefObject<HTMLSelectElement>,
    newValue: OrderByAge | Favorites
  ) => {
    if (!ref.current) return;
    ref.current.value = newValue;
  };

  const clearFilters = () => {
    const resettedPets = [...pets].filter(
      (pet: Pet) => pet.species === speciesFilter
    );
    setDisplayedPets(resettedPets);
    setOrderFilter("order by");
    setSpeciesFilter("cat");
    setFavoritesFilter("favorite status");

    orderRef && updateRef(orderRef, "order by");
    favoriteRef && updateRef(favoriteRef, "favorite status");
  };

  return { clearFilters, pets };
};

export default useClearFilters;
