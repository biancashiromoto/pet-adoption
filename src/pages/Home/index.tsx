import { createRef, useContext, useEffect } from "react";
import Modal from "../../components/Modal";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";
import Card from "../../components/Card";
import FiltersContainer from "../../components/FiltersContainer";
import Loader from "../../components/Loader";
import { Pet } from "../../types/Pet";
import { Context } from "../../context";
import fetchPets from "../../services/fetchPets";
import { useQuery } from "@tanstack/react-query";

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
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: fetchedPets,
  } = useQuery({
    queryKey: ["fetchPets"],
    queryFn: fetchPets,
    staleTime: Infinity,
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showAdoptionModal) {
          setShowAdoptionModal(false);
        }
        if (showUpdatePetsModal) {
          setShowUpdatePetsModal(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showAdoptionModal, showUpdatePetsModal]);

  useEffect(() => {
    document.title = "Home | Pet Adoption";
  }, []);

  useEffect(() => {
    if (showAdoptionModal) {
      document.title = `Adopt ${selectedPet[0].name} | Pet Adoption`;
    }
  }, [showAdoptionModal]);

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
      {isLoading && <Loader />}
      {!error && !isLoading && (
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
          {showAdoptionModal && (
            <>
              <Overlay openModal={setShowAdoptionModal} />
              <Modal
                title={`Would you like to adopt ${selectedPet[0].name}?`}
                text="You will be redirected to the adoption form"
              >
                <img
                  alt={`Random picture of a ${selectedPet[0].species}`}
                  src={selectedPet[0].url}
                />
                <div className="modal__buttons-container">
                  <Button.Root
                    ariaLabel="Yes"
                    onClick={() => navigate("/adopt")}
                  >
                    <Button.Label label="Yes" />
                  </Button.Root>
                  <Button.Root
                    ariaLabel="No"
                    onClick={() => setShowAdoptionModal(false)}
                  >
                    <Button.Label label="No" />
                  </Button.Root>
                </div>
              </Modal>
            </>
          )}
          {showUpdatePetsModal && (
            <>
              <Overlay openModal={setShowUpdatePetsModal} />
              <Modal
                text="Updating pets will remove the current list and fetch new ones. Do you want to continue?"
                title="Update pets?"
              >
                <div className="modal__buttons-container">
                  <Button.Root
                    ariaLabel="Yes"
                    onClick={() => {
                      fetchPets();
                      setShowUpdatePetsModal(false);
                    }}
                  >
                    <Button.Label label="Yes" />
                  </Button.Root>
                  <Button.Root
                    ariaLabel="No"
                    onClick={() => setShowUpdatePetsModal(false)}
                  >
                    <Button.Label label="No" />
                  </Button.Root>
                </div>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
