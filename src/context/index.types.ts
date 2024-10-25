import { Dispatch, SetStateAction } from "react";
import { PetData } from "../types/PetData";
import { OrderByAgeFilter, SpeciesFilter } from "../components/FiltersContainer/index.types";
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
  species: SpeciesFilter;
  setSpecies: Dispatch<SetStateAction<SpeciesFilter>>;
  order: OrderByAgeFilter;
  setOrder: Dispatch<SetStateAction<OrderByAgeFilter>>;
}