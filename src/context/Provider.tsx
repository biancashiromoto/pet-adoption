import { useState, ReactNode, createRef } from "react";
import { Context } from ".";
import { Pet } from "@/types/Pet.type";
import { ContextProps } from "./index.types";
import { Utils } from "../helpers/Utils";
import { Favorites, OrderByAge, Species } from "@/types/Filters.type";

const utils = new Utils();
const storagedDontShowNoticeAgain: boolean =
  utils.getLocalStorage("dont-show-again") === "true";

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const orderRef = createRef<HTMLSelectElement>();
  const favoriteRef = createRef<HTMLSelectElement>();

  const [pets, setPets] = useState<Pet[]>([] as Pet[]);
  const [displayedPets, setDisplayedPets] = useState(pets as Pet[]);
  const [selectedPet, setSelectedPet] = useState([] as Pet[]);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showUpdatePetsModal, setShowUpdatePetsModal] =
    useState<boolean>(false);
  const [speciesFilter, setSpeciesFilter] = useState<Species>("cat");
  const [orderFilter, setOrderFilter] = useState<OrderByAge>("order by");
  const [favoritesFilter, setFavoritesFilter] =
    useState<Favorites>("favorite status");
  const [showNotice, setShowNotice] = useState(!storagedDontShowNoticeAgain);
  const [dontShowHomePageNoticeAgain, setDontShowHomePageNoticeAgain] =
    useState(storagedDontShowNoticeAgain);

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
    dontShowHomePageNoticeAgain,
    setDontShowHomePageNoticeAgain,
    favoriteRef,
    orderRef,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
