import Filter from '../Filter'
import { Button } from '../Button'
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';

interface FiltersContainerProps {
  speciesRef: RefObject<HTMLSelectElement>;
  setSpecies: Dispatch<SetStateAction<'none' | 'dog' | 'cat'>>;
  orderRef: RefObject<HTMLSelectElement>;
  setOrder: Dispatch<SetStateAction<'none' | 'younger' | 'older'>>;
  clearFilters: () => void;
  favoriteRef: RefObject<HTMLSelectElement>;
  setFavoritesFilter: Dispatch<SetStateAction<'none' | 'favorites' | 'non favorites'>>;
}

const selectFilter = (e: ChangeEvent<HTMLSelectElement>, callback: Dispatch<SetStateAction<any>>) => {
  const value = e.target.value;
  callback(value);
}

const FiltersContainer = ({
  speciesRef,
  setSpecies,
  orderRef,
  setOrder,
  clearFilters,
  favoriteRef,
  setFavoritesFilter
}: FiltersContainerProps) => {
  return (
    <article className='filter-container'>
      <Filter
          id='species'
          items={['none', 'cat', 'dog']}
          label='Species: '
          ref={speciesRef}
          onChange={(e) => selectFilter(e, setSpecies)}
        />
        <Filter
          id='order'
          items={['none', 'younger', 'older']}
          label='Order: '
          ref={orderRef}
          onChange={(e) => selectFilter(e, setOrder)}
        />
        <Filter
          id='favorites'
          items={['none', 'favorites', 'non favorites']}
          label='Favorite status: '
          ref={favoriteRef}
          onChange={(e) => selectFilter(e, setFavoritesFilter)}
        />
        <Button.Root
          ariaLabel='Clear filter'
          onClick={() => clearFilters()}
        >
          <Button.Label label='Clear filter' />
        </Button.Root>
    </article>
  )
}

export default FiltersContainer