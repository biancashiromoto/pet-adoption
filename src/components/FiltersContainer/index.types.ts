import { RefObject } from "react";

export type SpeciesFilter = "all" | "dog" | "cat";
export type OrderByAgeFilter = "order by" | "older" | "younger";
export type FavoritesFilter = "favorite status" | "favorites" | "non favorites";

export interface FiltersContainerProps {
  orderRef: RefObject<HTMLSelectElement>;
  clearFilters: () => void;
  favoriteRef: RefObject<HTMLSelectElement>;
  resetFavorites: () => void;
}
