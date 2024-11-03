import { createRef, RefObject, useContext, useEffect } from "react";
import { Button } from "../../components/Button";
import FiltersContainer from "../../components/FiltersContainer";
import Loader from "../../components/Loader";
import { Pet } from "../../types/Pet";
import { Context } from "../../context";
import useEscapeKeyClose from "../../hooks/useEscapeKeyClose";
import ModalAdoptPets from "../../components/ModalAdoptPets";
import ModalUpdatePets from "../../components/ModalUpdatePets";
import { Utils } from "../../helpers/Utils";
import useUpdatePageTitle from "../../hooks/useUpdatePageTitle";
import {
  FavoritesFilter,
  OrderByAgeFilter,
  SpeciesFilter,
} from "../../components/FiltersContainer/index.types";
import { NavLink } from "react-router-dom";

const utils = new Utils();

const Home = () => {
  const orderRef = createRef<HTMLSelectElement>();
  const favoriteRef = createRef<HTMLSelectElement>();
  const {
    pets,
    setPets,
    setDisplayedPets,
    selectedPet,
    showAdoptionModal,
    showUpdatePetsModal,
    setShowUpdatePetsModal,
    speciesFilter,
    orderFilter,
    setOrderFilter,
    favoritesFilter,
    setFavoritesFilter,
    error,
    refetch,
    isLoadingOrFetchingData,
  } = useContext(Context);
  useEscapeKeyClose();

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
    if (favoritesFilter !== "all") {
      if (favoritesFilter === "favorites") {
        filteredPets = filteredPets.filter((pet: Pet) => pet.isFavorite);
      } else {
        filteredPets = filteredPets.filter((pet: Pet) => !pet.isFavorite);
      }
    }

    let orderedPets = filteredPets;
    if (orderFilter !== "none") {
      orderedPets = [...filteredPets].sort((a: Pet, b: Pet) => {
        if (!a.age || !b.age) return 0;
        return orderFilter === "younger" ? a.age - b.age : b.age - a.age;
      });
    }
    setDisplayedPets(orderedPets);
  };

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
    newValue: SpeciesFilter | OrderByAgeFilter | FavoritesFilter
  ) => {
    if (!ref.current) return;
    ref.current.value = newValue;
  };

  const clearFilters = () => {
    setDisplayedPets(pets);
    setOrderFilter("none");
    setFavoritesFilter("all");

    updateRef(orderRef, "none");
    updateRef(favoriteRef, "all");
  };

  useEffect(() => {
    utils.setLocalStorage("pets", pets);
  }, [pets]);

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      <Button.Root
        ariaLabel="Update pets"
        onClick={() => setShowUpdatePetsModal(true)}
      >
        <Button.Label label="Update pets" />
      </Button.Root>
      <hr />
      <FiltersContainer
        clearFilters={clearFilters}
        orderRef={orderRef}
        favoriteRef={favoriteRef}
        resetFavorites={resetFavorites}
      />
      <hr />
      {isLoadingOrFetchingData && <Loader />}
      {!error && !isLoadingOrFetchingData && (
        <>
          <NavLink to="cats">Cats</NavLink>
          <NavLink to="dogs">Dogs</NavLink>
          {showAdoptionModal && <ModalAdoptPets />}
          {showUpdatePetsModal && <ModalUpdatePets refetch={refetch} />}
        </>
      )}
    </>
  );
};

export default Home;
