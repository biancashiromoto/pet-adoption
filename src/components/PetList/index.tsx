import { Context } from "@/context";
import { useContext } from "react";
import Card from "../Card";
import { Pet } from "@/types/Pet.type";
import useToggleFavorite from "@/hooks/useToggleFavorite";

const PetList = () => {
  const { displayedPets, setSelectedPet, setShowAdoptionModal } =
    useContext(Context);
  const { toggleFavorite } = useToggleFavorite();

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
