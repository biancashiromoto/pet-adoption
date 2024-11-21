import { forwardRef } from "react";
import { FilterProps } from "./index.types";

const FilterSelect = forwardRef<HTMLSelectElement, FilterProps>(
  ({ id, label, items, onChange }, ref) => (
    <div className="filter-select" data-testid="filter-select">
      <label htmlFor={id}>{label}</label>
      <select id={id} ref={ref} onChange={onChange}>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
);

export default FilterSelect;
