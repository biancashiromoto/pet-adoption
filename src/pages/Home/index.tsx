import { createRef, RefObject, useContext, useEffect } from "react";
import FiltersContainer from "@/components/FiltersContainer";
import Loader from "@/components/Loader";
import { Pet } from "@/types/Pet";
import { Context } from "@/context";
import fetchPets from "@/services/fetchPets";
import { useQuery } from "@tanstack/react-query";
import useEscapeKeyClose from "@/hooks/useEscapeKeyClose";
import ModalAdoptPets from "@/components/ModalAdoptPets";
import ModalUpdatePets from "@/components/ModalUpdatePets";
import { Utils } from "@/helpers/Utils";
import useUpdatePageTitle from "@/hooks/useUpdatePageTitle";
import {
  FavoritesFilter,
  OrderByAgeFilter,
} from "../../components/FiltersContainer/index.types";
import PetList from "@/components/PetList";

const utils = new Utils();

const Home = () => {
  const speciesRef = createRef<HTMLSelectElement>();
  const orderRef = createRef<HTMLSelectElement>();
  const favoriteRef = createRef<HTMLSelectElement>();
  const {
    pets,
    setPets,
    setDisplayedPets,
    selectedPet,
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
  } = useContext(Context);
  useEscapeKeyClose();

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
    setPets(fetchedPets || []);
  }, [fetchedPets]);

  const resetFavorites = () => {
    const updatedPets = pets.map((pet: Pet) => ({
      ...pet,
      isFavorite: false,
    }));
    setPets(updatedPets);
    setDisplayedPets(updatedPets);
  };

  const applyFilters = () => {
    let filteredPets = pets;

    if (speciesFilter !== "all") {
      filteredPets = pets.filter((pet: Pet) => pet.species === speciesFilter);
    }

    if (favoritesFilter !== "favorite status") {
      if (favoritesFilter === "favorites") {
        filteredPets = filteredPets.filter((pet: Pet) => pet.isFavorite);
      } else {
        filteredPets = filteredPets.filter((pet: Pet) => !pet.isFavorite);
      }
    }

    let orderedPets = filteredPets;
    if (orderFilter !== "order by") {
      orderedPets = [...filteredPets].sort((a: Pet, b: Pet) => {
        if (!a.age || !b.age) return 0;
        return orderFilter === "younger" ? a.age - b.age : b.age - a.age;
      });
    }
    setDisplayedPets(orderedPets);
  };

  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [pets, speciesFilter, orderFilter, favoritesFilter]);

  useUpdatePageTitle(
    showAdoptionModal && selectedPet.length > 0
      ? `Adopt ${selectedPet[0].name} | Pet Adoption`
      : "Home | Pet Adoption"
  );

  const updateRef = (
    ref: RefObject<HTMLSelectElement>,
    newValue: OrderByAgeFilter | FavoritesFilter
  ) => {
    if (!ref.current) return;
    ref.current.value = newValue;
  };

  const clearFilters = () => {
    setDisplayedPets(pets);
    setOrderFilter("order by");
    setSpeciesFilter("cat");
    setFavoritesFilter("favorite status");

    updateRef(orderRef, "order by");
    updateRef(favoriteRef, "favorite status");
  };

  useEffect(() => {
    utils.setLocalStorage("pets", pets);
  }, [pets]);

  return (
    <div className="home">
      {error && <p>Error: {error.message}</p>}
      <FiltersContainer
        clearFilters={clearFilters}
        orderRef={orderRef}
        speciesRef={speciesRef}
        favoriteRef={favoriteRef}
        resetFavorites={resetFavorites}
      />
      {(isLoading || isFetching) && <Loader />}
      {!error && !isLoading && !isFetching && (
        <>
          <PetList />
          {showAdoptionModal && <ModalAdoptPets />}
          {showUpdatePetsModal && <ModalUpdatePets refetch={refetch} />}
        </>
      )}
    </div>
  );
};

export default Home;
