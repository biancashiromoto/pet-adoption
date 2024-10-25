import { RefObject } from "react";

export type SpeciesFilter = 'dogs' | 'cats';
export type OrderByAgeFilter = 'none' | 'older' | 'younger';
export type FavoritesFilter = 'all' | 'favorites' | 'non favorites';

export interface FiltersContainerProps {
  speciesRef?: RefObject<HTMLSelectElement>;
  clearFilters?: () => void;
  favoriteRef?: RefObject<HTMLSelectElement>;
  resetFavorites?: () => void;
}