import { createRef, RefObject, useContext, useEffect } from "react";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
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
  SpeciesFilter,
} from "../../components/FiltersContainer/index.types";

const utils = new Utils();

const Home = () => {
  const speciesRef = createRef<HTMLSelectElement>();
  const orderRef = createRef<HTMLSelectElement>();
  const favoriteRef = createRef<HTMLSelectElement>();
  const {
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
    newValue: SpeciesFilter | OrderByAgeFilter | FavoritesFilter
  ) => {
    if (!ref.current) return;
    ref.current.value = newValue;
  };

  const clearFilters = () => {
    setDisplayedPets(pets);
    setOrderFilter("none");
    setSpeciesFilter("all");
    setFavoritesFilter("all");

    updateRef(speciesRef, "all");
    updateRef(orderRef, "none");
    updateRef(favoriteRef, "all");
  };

  const toggleFavorite = (id: Pet["id"]) => {
    setPets((prevPets: Pet[]) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === id) {
          return { ...pet, isFavorite: !pet.isFavorite };
        }
        return pet;
      });

      return updatedPets;
    });
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
        speciesRef={speciesRef}
        favoriteRef={favoriteRef}
        resetFavorites={resetFavorites}
      />
      <hr />
      Species:
      <label htmlFor="cats">
        Cats
        <input
          id="cats"
          type="radio"
          name="species"
          onClick={() => setSpeciesFilter("cat")}
          checked={speciesFilter === "cat"}
        />
      </label>
      <label htmlFor="dogs">
        Dogs
        <input
          id="dogs"
          type="radio"
          name="species"
          onClick={() => setSpeciesFilter("dog")}
          checked={speciesFilter === "dog"}
        />
      </label>
      <hr />
      {(isLoading || isFetching) && <Loader />}
      {!error && !isLoading && !isFetching && (
        <>
          <main>
            {displayedPets &&
              displayedPets.map((pet: Pet) => (
                <Card
                  key={pet.id}
                  pet={pet}
                  setSelectedPet={setSelectedPet}
                  setShowModal={setShowAdoptionModal}
                  toggleFavorite={toggleFavorite}
                />
              ))}
          </main>
          {showAdoptionModal && <ModalAdoptPets />}
          {showUpdatePetsModal && <ModalUpdatePets refetch={refetch} />}
        </>
      )}
    </>
  );
};

export default Home;
