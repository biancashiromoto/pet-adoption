import { Context } from "@/context";
import { useContext } from "react";
import Card from "../Card";
import { Pet } from "@/types/Pet.type";

const PetList = () => {
  const { displayedPets, setSelectedPet, setShowAdoptionModal, setPets } =
    useContext(Context);

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
    <div
      className={`pet-list ${displayedPets.length === 0 || !displayedPets ? "offwhite" : ""}`}
    >
      {(displayedPets.length === 0 || !displayedPets) && (
        <h2 className="no-pets">No pets found :/</h2>
      )}
      {displayedPets.length > 0 &&
        displayedPets.map((pet: Pet) => (
          <Card
            key={pet.id}
            pet={pet}
            setSelectedPet={setSelectedPet}
            setShowModal={setShowAdoptionModal}
            toggleFavorite={toggleFavorite}
          />
        ))}
    </div>
  );
};

export default PetList;
