import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Pet } from "@/types/Pet.type";
import useToggleFavorite from "@/hooks/useToggleFavorite";
import { Context } from "@/context";

export interface CardProps {
  pet: Pet;
}
const Card = ({ pet }: CardProps) => {
  const { setSelectedPets, setShowAdoptionModal } = useContext(Context);
  const { toggleFavorite } = useToggleFavorite();
  return (
    <article
      className="card"
      onClick={() => {
        setSelectedPets([pet]);
        setShowAdoptionModal(true);
      }}
      tabIndex={0}
      data-testid="card"
    >
      <div className="card__content">
        <img alt="Random picture of a cat" src={pet.url} />
        <div className="card__text">
          <h3>{pet.name}</h3>
          <p>Age: {pet.age}</p>
          <button
            data-testid="favorite-button"
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
