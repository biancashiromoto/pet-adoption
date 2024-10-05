import { Dispatch, LegacyRef, SetStateAction } from "react";
import { Button } from "../Button";

interface FilterProps {
  speciesRef: LegacyRef<HTMLSelectElement>;
  setSpecies: Dispatch<SetStateAction<'none' | 'dog' | 'cat'>>;
  orderRef: LegacyRef<HTMLSelectElement>;
  setOrder: Dispatch<SetStateAction<'none' | 'older' | 'younger'>>;
  clearFilters: () => void;
}

const Filter = ({ clearFilters, speciesRef, setSpecies, orderRef, setOrder }: FilterProps) => {
  return (
    <div className='filter'>
      <label htmlFor='species'>
        Species: 
        <select ref={speciesRef} id='species' onChange={(e) => {
          const value = e.target.value as 'none' | 'dog' | 'cat';
          setSpecies(value);
        }}>
          <option value=''>Select species</option>
          <option value='cat'>Cats</option>
          <option value='dog'>Dogs</option>
        </select>
      </label>
      <label htmlFor='sort'>
        Sort: 
        <select ref={orderRef} id='sort' onChange={(e) => {
          const value = e.target.value as 'none' | 'older' | 'younger';
          setOrder(value);
        }}>
          <option value='none'>None</option>
          <option value='older'>Older</option>
          <option value='younger'>Younger</option>
        </select>
      </label>
      <Button.Root onClick={() => clearFilters()}>
        <Button.Label label='Clear filters' />
      </Button.Root>
    </div>
  )
}

export default Filter