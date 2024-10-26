import { useContext } from "react";
import Filter from "../Filter";
import SpeciesFilter from "../SpeciesFilter";
import {
  FavoritesFilter,
  FiltersContainerProps,
  OrderByAgeFilter,
} from "./index.types";
import { Context } from "../../context";
import useSetLocalStorage from "../../hooks/useSetLocalStorage";

const FiltersContainer = ({
  orderByAgeRef,
  favoritesRef,
}: FiltersContainerProps) => {
  const { setOrder, setFavorites } = useContext(Context);
  useSetLocalStorage();

  return (
    <article className="filter-container">
      <SpeciesFilter />
      <Filter
        id="order-by-age"
        label="Order by:"
        items={["none", "younger", "older"]}
        onChange={() => {
          if (orderByAgeRef?.current) {
            setOrder(orderByAgeRef.current.value as OrderByAgeFilter);
          }
        }}
        ref={orderByAgeRef}
      />
      <Filter
        id="favorites"
        label="Favorites:"
        items={["all", "favorites", "non favorites"]}
        onChange={() => {
          if (favoritesRef?.current) {
            setFavorites(favoritesRef.current.value as FavoritesFilter);
          }
        }}
        ref={favoritesRef}
      />
    </article>
  );
};

export default FiltersContainer;
