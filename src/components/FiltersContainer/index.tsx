import { useContext } from 'react';
import Filter from '../Filter';
import SpeciesFilter from '../SpeciesFilter';
import { FiltersContainerProps, OrderByAgeFilter } from './index.types';
import { Context } from '../../context';
import { Button } from '../Button';

const FiltersContainer = ({ orderByAgeRef }: FiltersContainerProps) => {
  const { setOrder } = useContext(Context);

  const clearFilters = () => {
    setOrder('none');
    if (orderByAgeRef?.current) {
      orderByAgeRef.current.value = 'none';
    }
  };
  
  return (
    <article className='filter-container'>
      <SpeciesFilter />
      <Filter
        id='order-by-age'
        label='Order by:'
        items={['none', 'younger', 'older']}
        onChange={() => {
          if (orderByAgeRef?.current) {
            setOrder(orderByAgeRef.current.value as OrderByAgeFilter);
          }
        }}
        ref={orderByAgeRef}
      />
      <Button.Root
        onClick={clearFilters}
        ariaLabel='Clear filters'
        className='button__clear-filters'
        disabled={false}
      >
        <Button.Label label='Clear filters' />
      </Button.Root>
    </article>
  );
};

export default FiltersContainer;
