import { Dispatch, SetStateAction } from "react";
import { Pet } from "../../pages/Home";

interface CardProps {
  pet: Pet;
  setSelectedPet: Dispatch<SetStateAction<Pet[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Card = ({ pet, setSelectedPet, setShowModal }: CardProps) => {
  return (
    <article
      className='card'
      onClick={() => {
        setSelectedPet([pet]);
        setShowModal(true);
      }}
    >
      <img alt='Random picture of a cat' src={pet.url} />
      <h3>{pet.name}</h3>
      <p>Age: {pet.age}</p>
    </article>
  )
}

export default Card