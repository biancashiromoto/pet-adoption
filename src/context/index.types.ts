import { Dispatch, RefObject, SetStateAction } from "react";
import { Pet } from "@/types/Pet";
import {
  FavoritesFilter,
  OrderByAgeFilter,
  SpeciesFilter,
} from "@/components/FiltersContainer/index.types";

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
  dontShowHomePageNoticeAgain: boolean;
  setDontShowHomePageNoticeAgain: Dispatch<SetStateAction<boolean>>;
  orderRef: RefObject<HTMLSelectElement>;
  favoriteRef: RefObject<HTMLSelectElement>;
}
