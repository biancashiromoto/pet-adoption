import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { Pet } from "../../types/Pet";
import Card from "../Card";
import { SpeciesFilter } from "../FiltersContainer/index.types";

type PetListProps = {
  species: SpeciesFilter;
};

const PetList = ({ species }: PetListProps) => {
  const {
    pets,
    setSelectedPet,
    setShowAdoptionModal,
    setPets,
    isLoadingOrFetchingData,
  } = useContext(Context);
  const [displayedPets, setDisplayedPets] = useState([] as Pet[]);

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
    setDisplayedPets(pets.filter((pet: Pet) => pet.species === species));
  }, [species]);

  return (
    <article className="pet-list">
      {!isLoadingOrFetchingData &&
        displayedPets &&
        displayedPets
          .filter((pet: Pet) => pet.species === species)
          .map((pet: Pet) => (
            <Card
              key={pet.id}
              pet={pet}
              setSelectedPet={setSelectedPet}
              setShowModal={setShowAdoptionModal}
              toggleFavorite={toggleFavorite}
            />
          ))}
    </article>
  );
};

export default PetList;
