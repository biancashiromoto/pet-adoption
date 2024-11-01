import { useState, ReactNode } from "react";
import { Context } from ".";
import { Pet } from "../types/Pet";
import { ContextProps } from "./index.types";
import {
  FavoritesFilter,
  OrderByAgeFilter,
  SpeciesFilter,
} from "../components/FiltersContainer/index.types";

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [displayedPets, setDisplayedPets] = useState<Pet[]>(pets);
  const [selectedPet, setSelectedPet] = useState<Pet[]>([]);
  const [showAdoptionModal, setShowAdoptionModal] = useState<boolean>(false);
  const [showUpdatePetsModal, setShowUpdatePetsModal] =
    useState<boolean>(false);
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>("all");
  const [orderFilter, setOrderFilter] = useState<OrderByAgeFilter>("none");
  const [favoritesFilter, setFavoritesFilter] =
    useState<FavoritesFilter>("all");

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
    speciesFilter,
    setSpeciesFilter,
    orderFilter,
    setOrderFilter,
    favoritesFilter,
    setFavoritesFilter,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
