import { Context } from "@/context";
import { useContext } from "react";
import Card from "../Card";
import { Pet } from "@/types/Pet.type";
import useFetchPets from "@/hooks/useFetchPets";

const PetList = () => {
  const { displayedPets } = useContext(Context);
  const { isLoadingOrFetching } = useFetchPets();

  return (
    <div
      className={`pet-list ${displayedPets.length === 0 || !displayedPets ? "offwhite" : ""}`}
    >
      {(displayedPets.length === 0 || !displayedPets) &&
        !isLoadingOrFetching && <h2 className="no-pets">No pets found :/</h2>}
      {displayedPets.length > 0 &&
        displayedPets.map((pet: Pet) => <Card key={pet.id} pet={pet} />)}
    </div>
  );
};

export default PetList;
