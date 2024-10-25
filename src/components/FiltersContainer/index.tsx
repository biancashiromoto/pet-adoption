import { useContext } from 'react';
import Filter from '../Filter';
import SpeciesFilter from '../SpeciesFilter';
import { FiltersContainerProps, OrderByAgeFilter } from './index.types';
import { Context } from '../../context';

const FiltersContainer = ({speciesRef}: FiltersContainerProps) => {
  const { setOrder } = useContext(Context);
  return (
    <article className='filter-container'>
      <SpeciesFilter />
      <Filter
        id='order-by-age'
        label='Order by:'
        items={['none', 'younger', 'older']}
        onChange={() => setOrder(speciesRef?.current?.value as OrderByAgeFilter)}
        ref={speciesRef}
      />
    </article>
  )
}

export default FiltersContainer