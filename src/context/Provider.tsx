import { useState, ReactNode } from "react";
import { Context } from ".";
import { PetData } from "../types/PetData";
import { ContextProps } from "./index.types";
import {
  OrderByAgeFilter,
  SpeciesFilter,
} from "../components/FiltersContainer/index.types";
import { Utils } from "../services/Utils";

export type Pets = {
  dogs: PetData[];
  cats: PetData[];
};

const { getLocalStorage } = new Utils();
const localSpecies: string = getLocalStorage("species");

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pets>({ cats: [], dogs: [] });
  const [displayedPets, setDisplayedPets] = useState<Pets>({
    cats: [],
    dogs: [],
  });
  const [selectedPet, setSelectedPet] = useState<PetData[]>([]);
  const [showAdoptionModal, setShowAdoptionModal] = useState<boolean>(false);
  const [showUpdatePetsModal, setShowUpdatePetsModal] =
    useState<boolean>(false);
  const [species, setSpecies] = useState<SpeciesFilter>(
    (localSpecies as SpeciesFilter) || "cats"
  );
  const [order, setOrder] = useState<OrderByAgeFilter>("none");

  const value: ContextProps = {
    pets,
    setPets,
    displayedPets,
    setDisplayedPets,
    selectedPet,
    setSelectedPet,
    showAdoptionModal,
    setShowAdoptionModal,
    showUpdatePetsModal,
    setShowUpdatePetsModal,
    species,
    setSpecies,
    order,
    setOrder,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
