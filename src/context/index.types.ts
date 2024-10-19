import { Dispatch, SetStateAction } from "react";
import { Pet } from "../types/Pet";
import { FavoritesFilter, OrderByAgeFilter, SpeciesFilter } from "../components/FiltersContainer/index.types";

export interface ContextProps {
  displayedPets: Pet[],
  setDisplayedPets: Dispatch<SetStateAction<Pet[]>>,
  selectedPet: Pet[],
  setSelectedPet: Dispatch<SetStateAction<Pet[]>>,
  showAdoptionModal: boolean,
  setShowAdoptionModal: Dispatch<SetStateAction<boolean>>,
  showUpdatePetsModal: boolean,
  setShowUpdatePetsModal: Dispatch<SetStateAction<boolean>>,
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  speciesFilter: SpeciesFilter,
  setSpeciesFilter: Dispatch<SetStateAction<SpeciesFilter>>,
  orderFilter: OrderByAgeFilter,
  setOrderFilter: Dispatch<SetStateAction<OrderByAgeFilter>>,
  favoritesFilter: FavoritesFilter,
  setFavoritesFilter: Dispatch<SetStateAction<FavoritesFilter>>,
  error: string,
  setError: Dispatch<SetStateAction<string>>;
  species: SpeciesFilter;
  setSpecies: Dispatch<SetStateAction<SpeciesFilter>>;
}