import FilterSelect from "@/components/FilterSelect";
import { Button } from "@/components/Button";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useContext,
} from "react";
import { Context } from "@/context";
import { IoMdClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import useClearFilters from "@/hooks/useClearFilters";
import useResetFavorites from "@/hooks/useResetFavorites";
import FilterRadioOption from "../FilterRadioOption";

const selectFilter = (
  e: ChangeEvent<HTMLSelectElement>,
  callback: Dispatch<SetStateAction<any>>
) => {
  const value = e.target.value;
  callback(value);
};

const FiltersContainer = () => {
  const {
    setFavoritesFilter,
    setOrderFilter,
    speciesFilter,
    setSpeciesFilter,
    orderRef,
    favoriteRef,
  } = useContext(Context);
  const { clearFilters } = useClearFilters();
  const { resetFavorites } = useResetFavorites();

  const handleKeyDown = (
    e: KeyboardEvent<HTMLLabelElement>,
    callback: () => void
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      callback();
    }
  };

  return (
    <article className="filter-container">
      <div className="selects-buttons">
        <section className="filter-container__selects">
          <FilterSelect
            title="order"
            id="order"
            items={["order by", "younger", "older"]}
            ref={orderRef}
            onChange={(e) => selectFilter(e, setOrderFilter)}
          />
          <FilterSelect
            title="favorites"
            id="favorites"
            items={["favorite status", "favorites", "non favorites"]}
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
        <FilterRadioOption
          name="species"
          checked={speciesFilter === "cat"}
          className={`${speciesFilter === "cat" ? "active" : ""}`}
          id="cats"
          onKeyDown={(e) => handleKeyDown(e, () => setSpeciesFilter("cat"))}
          onChange={() => setSpeciesFilter("cat")}
        />
        <FilterRadioOption
          name="species"
          checked={speciesFilter === "dog"}
          className={`${speciesFilter === "dog" ? "active" : ""}`}
          id="dogs"
          onKeyDown={(e) => handleKeyDown(e, () => setSpeciesFilter("dog"))}
          onChange={() => setSpeciesFilter("dog")}
        />
      </section>
    </article>
  );
};

export default FiltersContainer;
