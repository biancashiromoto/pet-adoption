import { createRef, useContext, useEffect } from "react";
import { Button } from "../../components/Button";
import Card from "../../components/Card";
import FiltersContainer from "../../components/FiltersContainer";
import Loader from "../../components/Loader";
import { Pet } from "../../types/Pet";
import { Context } from "../../context";
import fetchPets from "../../services/fetchPets";
import { useQuery } from "@tanstack/react-query";
import useEscapeKeyClose from "../../hooks/useEscapeKeyClose";
import ModalAdoptPets from "../../ModalAdoptPets";
import ModalUpdatePets from "../../components/ModalUpdatePets";

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

  useEffect(() => {
    if (showAdoptionModal) {
      document.title = `Adopt ${selectedPet[0].name} | Pet Adoption`;
    } else {
      document.title = "Home | Pet Adoption";
    }
  }, [showAdoptionModal]);

  useEffect(() => {
    document.title = "Home | Pet Adoption";
  }, []);

  const clearFilters = () => {
    setDisplayedPets(pets);
    setOrderFilter("none");
    setSpeciesFilter("all");
    setFavoritesFilter("all");

    if (speciesRef.current) {
      speciesRef.current.value = "all";
    }

    if (orderRef.current) {
      orderRef.current.value = "none";
    }

    if (favoriteRef.current) {
      favoriteRef.current.value = "all";
    }
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
