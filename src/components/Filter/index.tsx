import { forwardRef } from "react";
import { FilterProps } from "./index.types";

const Filter = forwardRef<HTMLSelectElement, FilterProps>(
  ({ id, label, items, onChange }, ref) => (
    <div className="filter-container__filter">
      <label htmlFor={id}>{label}</label>
      <select id={id} ref={ref} onChange={onChange} data-testid="filter-select">
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
);

export default Filter;
