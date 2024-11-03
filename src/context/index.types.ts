import { Dispatch, SetStateAction } from "react";
import { Pet } from "../types/Pet";
import {
  FavoritesFilter,
  OrderByAgeFilter,
  SpeciesFilter,
} from "../components/FiltersContainer/index.types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface ContextProps {
  pets: Pet[];
  setPets: Dispatch<SetStateAction<Pet[]>>;
  displayedPets: Pet[];
  setDisplayedPets: Dispatch<SetStateAction<Pet[]>>;
  selectedPet: Pet[];
  setSelectedPet: Dispatch<SetStateAction<Pet[]>>;
  showAdoptionModal: boolean;
  setShowAdoptionModal: Dispatch<SetStateAction<boolean>>;
  showUpdatePetsModal: boolean;
  setShowUpdatePetsModal: Dispatch<SetStateAction<boolean>>;
  speciesFilter: SpeciesFilter;
  setSpeciesFilter: Dispatch<SetStateAction<SpeciesFilter>>;
  orderFilter: OrderByAgeFilter;
  setOrderFilter: Dispatch<SetStateAction<OrderByAgeFilter>>;
  favoritesFilter: FavoritesFilter;
  setFavoritesFilter: Dispatch<SetStateAction<FavoritesFilter>>;
  showNotice: boolean;
  setShowNotice: Dispatch<SetStateAction<boolean>>;
  dontShowNoticeAgain: boolean;
  setDontShowNoticeAgain: Dispatch<SetStateAction<boolean>>;
  isLoadingOrFetchingData: boolean;
  error: Error | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Pet[], Error>>;
}
