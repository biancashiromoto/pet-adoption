import { useState, ReactNode } from "react";
import { Context } from ".";
import { Pet } from "@/types/Pet";
import { ContextProps } from "./index.types";
import {
  FavoritesFilter,
  OrderByAgeFilter,
  SpeciesFilter,
} from "../components/FiltersContainer/index.types";
import { Utils } from "../helpers/Utils";

const utils = new Utils();
const storagedDontShowNoticeAgain: boolean =
  utils.getLocalStorage("dont-show-again") === "true";

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>([] as Pet[]);
  const [displayedPets, setDisplayedPets] = useState(pets as Pet[]);
  const [selectedPet, setSelectedPet] = useState([] as Pet[]);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showUpdatePetsModal, setShowUpdatePetsModal] =
    useState<boolean>(false);
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>("all");
  const [orderFilter, setOrderFilter] = useState<OrderByAgeFilter>("none");
  const [favoritesFilter, setFavoritesFilter] =
    useState<FavoritesFilter>("all");
  const [showNotice, setShowNotice] = useState(!storagedDontShowNoticeAgain);
  const [dontShowNoticeAgain, setDontShowNoticeAgain] = useState(
    storagedDontShowNoticeAgain
  );

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
    showNotice,
    setShowNotice,
    dontShowNoticeAgain,
    setDontShowNoticeAgain,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
