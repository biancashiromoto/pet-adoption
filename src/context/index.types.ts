import { Dispatch, RefObject, SetStateAction } from "react";
import { Pet } from "@/types/Pet.type";
import { Favorites, OrderByAge, Species } from "@/types/Filters.type";

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
  speciesFilter: Species;
  setSpeciesFilter: Dispatch<SetStateAction<Species>>;
  orderFilter: OrderByAge;
  setOrderFilter: Dispatch<SetStateAction<OrderByAge>>;
  favoritesFilter: Favorites;
  setFavoritesFilter: Dispatch<SetStateAction<Favorites>>;
  showNotice: boolean;
  setShowNotice: Dispatch<SetStateAction<boolean>>;
  dontShowHomePageNoticeAgain: boolean;
  setDontShowHomePageNoticeAgain: Dispatch<SetStateAction<boolean>>;
  orderRef: RefObject<HTMLSelectElement> | null;
  favoriteRef: RefObject<HTMLSelectElement> | null;
}
