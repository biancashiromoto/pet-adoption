import FilterSelect from "@/components/FilterSelect";
import { Button } from "@/components/Button";
import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";
import { FiltersContainerProps } from "./index.types";
import { Context } from "@/context";
import { IoMdClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

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
      <div className="selects-buttons">
        <section className="filter-container__selects">
          <FilterSelect
            title="order"
            id="order"
            items={["Order by", "Younger", "Older"]}
            ref={orderRef}
            onChange={(e) => selectFilter(e, setOrderFilter)}
          />
          <FilterSelect
            title="favorites"
            id="favorites"
            items={["Favorite status", "Favorites", "Non favorites"]}
            ref={favoriteRef}
            onChange={(e) => selectFilter(e, setFavoritesFilter)}
          />
        </section>
        <section className="filter-container__buttons">
          <Button.Root ariaLabel="Clear filters" onClick={() => clearFilters()}>
            <IoMdClose />
            <Button.Label label="Clear filters" />
          </Button.Root>
          <Button.Root
            ariaLabel="Reset favorites"
            onClick={() => resetFavorites()}
          >
            <GrPowerReset />
            <Button.Label label="Reset favorites" />
          </Button.Root>
        </section>
      </div>
      <section className="filter-container__species">
        <label
          className={`${speciesFilter === "cat" ? "active" : ""}`}
          htmlFor="cats"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSpeciesFilter("cat");
            }
          }}
        >
          <input
            id="cats"
            type="radio"
            name="species"
            onChange={() => setSpeciesFilter("cat")}
            checked={speciesFilter === "cat"}
          />
          <span>Cats</span>
        </label>
        <label
          className={`${speciesFilter === "dog" ? "active" : ""}`}
          htmlFor="dogs"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSpeciesFilter("dog");
            }
          }}
        >
          <input
            id="dogs"
            type="radio"
            name="species"
            onChange={() => setSpeciesFilter("dog")}
            checked={speciesFilter === "dog"}
          />
          <span>Dogs</span>
        </label>
      </section>
    </article>
  );
};

export default FiltersContainer;
