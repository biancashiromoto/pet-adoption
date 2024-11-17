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
  orderRef,
  clearFilters,
  favoriteRef,
  resetFavorites,
}: FiltersContainerProps) => {
  const {
    setFavoritesFilter,
    setOrderFilter,
    speciesFilter,
    setSpeciesFilter,
  } = useContext(Context);
  return (
    <article className="filter-container">
      <section className="filter-container__selects">
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
      </section>
      <section className="filter-container__buttons">
        <Button.Root ariaLabel="Clear filter" onClick={() => clearFilters()}>
          <Button.Label label="Clear filter" />
        </Button.Root>
        <Button.Root
          ariaLabel="Reset favorites"
          onClick={() => resetFavorites()}
        >
          <Button.Label label="Reset favorites" />
        </Button.Root>
      </section>
      <section className="filter-container__species">
        <label
          className={`${speciesFilter === "cat" ? "active" : ""}`}
          htmlFor="cats"
        >
          <input
            id="cats"
            type="radio"
            name="species"
            onClick={() => setSpeciesFilter("cat")}
            checked={speciesFilter === "cat"}
          />
          <span>Cats</span>
        </label>
        <label
          className={`${speciesFilter === "dog" ? "active" : ""}`}
          htmlFor="dogs"
        >
          <input
            id="dogs"
            type="radio"
            name="species"
            onClick={() => setSpeciesFilter("dog")}
            checked={speciesFilter === "dog"}
          />
          <span>Dogs</span>
        </label>
      </section>
    </article>
  );
};

export default FiltersContainer;
