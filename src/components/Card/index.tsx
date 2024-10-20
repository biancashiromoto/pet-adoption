import { Dispatch, memo, SetStateAction } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PetData } from "../../types/PetData";

interface CardProps {
  pet: PetData;
  setSelectedPet: Dispatch<SetStateAction<PetData[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  toggleFavorite: (id: PetData["id"]) => void;
}

const Card = memo(({ pet, setSelectedPet, setShowModal, toggleFavorite }: CardProps) => {
  return (
    <article
      className='card'
      onClick={() => {
        setSelectedPet([pet]);
        setShowModal(true);
      }}
    >
      <img alt='Random picture of a cat' src={pet.url} />
      <div className="card__text">
        <h3>{pet.name}</h3>
        <p>Age: {pet.age}</p>
        <button type="button" onClick={(e) => {
          e.stopPropagation();
          toggleFavorite && toggleFavorite(pet.id);
        }}>
          {!pet.isFavorite ? <FaRegHeart /> :<FaHeart />}
        </button>
      </div>
    </article>
  )
})

export default Card