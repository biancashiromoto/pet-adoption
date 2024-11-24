import { Species } from "./Filters.type";

export type Pet = {
  age?: number;
  id: string;
  isFavorite: boolean;
  height: number;
  name?: string;
  species?: Species;
  url: string;
  width: number;
};
