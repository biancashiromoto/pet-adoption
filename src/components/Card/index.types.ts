import { PetData } from "../../types/PetData";

export interface CardProps {
  pet: PetData;
  toggleFavorite: (id: PetData["id"]) => void;
}
