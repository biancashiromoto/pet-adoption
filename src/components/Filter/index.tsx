import { forwardRef } from 'react';

interface FilterProps {
  id: string;
  label: string;
  items: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter = forwardRef<HTMLSelectElement, FilterProps>(({ id, label, items, onChange }, ref) => (
  <div className='filter-container__filter'>
    <label htmlFor={id}>{label}</label>
    <select id={id} ref={ref} onChange={onChange}>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
));

export default Filter;
