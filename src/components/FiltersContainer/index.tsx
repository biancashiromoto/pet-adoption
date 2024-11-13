import Filter from "@/components/Filter";
import { Button } from "@/components/Button";
import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";
import { FiltersContainerProps } from "./index.types";
import { Context } from "@/context";

const selectFilter = (
  e: ChangeEvent<HTMLSelectElement>,
  callback: Dispatch<SetStateAction<any>>
) => {
  const value = e.target.value;
  callback(value);
};

const FiltersContainer = ({
  speciesRef,
  orderRef,
  clearFilters,
  favoriteRef,
  resetFavorites,
}: FiltersContainerProps) => {
  const { setFavoritesFilter, setOrderFilter, setSpeciesFilter } =
    useContext(Context);
  return (
    <article className="filter-container">
      <Filter
        id="species"
        items={["all", "cat", "dog"]}
        label="Species: "
        ref={speciesRef}
        onChange={(e) => selectFilter(e, setSpeciesFilter)}
      />
      <Filter
        id="order"
        items={["none", "younger", "older"]}
        label="Order: "
        ref={orderRef}
        onChange={(e) => selectFilter(e, setOrderFilter)}
      />
      <Filter
        id="favorites"
        items={["all", "favorites", "non favorites"]}
        label="Favorite status: "
        ref={favoriteRef}
        onChange={(e) => selectFilter(e, setFavoritesFilter)}
      />
      <Button.Root ariaLabel="Clear filter" onClick={() => clearFilters()}>
        <Button.Label label="Clear filter" />
      </Button.Root>
      <Button.Root ariaLabel="Reset favorites" onClick={() => resetFavorites()}>
        <Button.Label label="Reset favorites" />
      </Button.Root>
    </article>
  );
};

export default FiltersContainer;
