import {
  FavoritesFilter,
  OrderByAgeFilter,
} from "@/components/FiltersContainer/index.types";
import { Context } from "@/context";
import { Pet } from "@/types/Pet";
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
    newValue: OrderByAgeFilter | FavoritesFilter
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

    updateRef(orderRef, "order by");
    updateRef(favoriteRef, "favorite status");
  };

  return { clearFilters, pets };
};

export default useClearFilters;
