import { memo, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Context } from "../../context";
import { CardProps } from "./index.types";

const Card = memo(({ pet, toggleFavorite }: CardProps) => {
  const { setSelectedPet, setShowAdoptionModal } = useContext(Context);
  return (
    <article
      className="card"
      onClick={() => {
        setSelectedPet([pet]);
        setShowAdoptionModal(true);
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
            toggleFavorite && toggleFavorite(pet.id);
          }}
        >
          {pet.isFavorite ? (
            <FaHeart data-testid="FaHeart" />
          ) : (
            <FaRegHeart data-testid="FaRegHeart" />
          )}
        </button>
      </div>
    </article>
  );
});

export default Card;
