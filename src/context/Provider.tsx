import { useState, ReactNode, useEffect } from "react";
import { Context } from ".";
import { Pet } from "../types/Pet";
import { ContextProps } from "./index.types";
import {
  FavoritesFilter,
  OrderByAgeFilter,
  SpeciesFilter,
} from "../components/FiltersContainer/index.types";
import { Utils } from "../helpers/Utils";
import { useQuery } from "@tanstack/react-query";
import fetchPets from "../services/fetchPets";

const utils = new Utils();

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storagedDontShowNoticeAgain: boolean =
    utils.getLocalStorage("dont-show-again") === "true";

  const [pets, setPets] = useState<Pet[]>(() => {
    const storagedPets = utils.getLocalStorage("pets");
    return storagedPets && storagedPets.length > 0 ? storagedPets : [];
  });
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
  const [isLoadingOrFetchingData, setIsLoadingOrFetchingData] = useState(false);

  const {
    isLoading,
    isFetching,
    error,
    data: fetchedPets,
    refetch,
  } = useQuery({
    queryKey: ["fetchPets"],
    queryFn: fetchPets,
  });

  useEffect(() => {
    if (fetchedPets) {
      setPets(fetchedPets);
      utils.setLocalStorage("pets", fetchedPets);
    }
  }, [fetchedPets]);

  useEffect(() => {
    setDisplayedPets(pets);
  }, [pets]);

  useEffect(() => {
    setIsLoadingOrFetchingData(isFetching || isLoading);
  }, [isLoading, isFetching]);

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
    error,
    refetch,
    isLoadingOrFetchingData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
