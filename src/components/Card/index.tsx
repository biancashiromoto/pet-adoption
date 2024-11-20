import { Dispatch, SetStateAction } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Pet } from "@/types/Pet.type";

export interface CardProps {
  pet: Pet;
  setSelectedPet: Dispatch<SetStateAction<Pet[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  toggleFavorite: (id: Pet["id"]) => void;
}

const Card = ({
  pet,
  setSelectedPet,
  setShowModal,
  toggleFavorite,
}: CardProps) => {
  return (
    <article
      className="card"
      onClick={() => {
        setSelectedPet([pet]);
        setShowModal(true);
      }}
      tabIndex={0}
    >
      <div className="card__content">
        <img alt="Random picture of a cat" src={pet.url} />
        <div className="card__text">
          <h3>{pet.name}</h3>
          <p>Age: {pet.age}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(pet.id);
            }}
          >
            {!pet.isFavorite ? (
              <FaRegHeart className="unfilled" data-testid="heart__unfilled" />
            ) : (
              <FaHeart className="filled" data-testid="heart__filled" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
