import { Dispatch, SetStateAction } from "react";
import { Pet } from "../../types/Pet";
import { GoHeart, GoHeartFill } from "react-icons/go";

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
    >
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
            <GoHeart data-testid="heart__unfilled" />
          ) : (
            <GoHeartFill data-testid="heart__filled" />
          )}
        </button>
      </div>
    </article>
  );
};

export default Card;
