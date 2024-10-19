import { Dispatch, SetStateAction } from "react";
import { PetData } from "../types/PetData";
import { FavoritesFilter, OrderByAgeFilter, SpeciesFilter } from "../components/FiltersContainer/index.types";
import { Pets } from "./Provider";

export interface ContextProps {
  pets: Pets,
  setPets: Dispatch<SetStateAction<Pets>>,
  displayedPets: Pets,
  setDisplayedPets: Dispatch<SetStateAction<Pets>>,
  selectedPet: PetData[],
  setSelectedPet: Dispatch<SetStateAction<PetData[]>>,
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