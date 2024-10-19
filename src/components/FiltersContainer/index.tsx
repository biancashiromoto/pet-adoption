import Filter from '../Filter'
import { Button } from '../Button'
import { ChangeEvent, Dispatch, SetStateAction, useContext } from 'react';
import { FiltersContainerProps } from './index.types';
import { Context } from '../../context';

const selectFilter = (e: ChangeEvent<HTMLSelectElement>, callback: Dispatch<SetStateAction<any>>) => {
  const value = e.target.value;
  callback(value);
}

const FiltersContainer = ({
  orderRef,
  clearFilters,
  favoriteRef,
  resetFavorites
}: FiltersContainerProps) => {
  const {
    setFavoritesFilter,
    setOrderFilter,
    speciesFilter,
    setSpeciesFilter
  } = useContext(Context);
  return (
    <article className='filters'>
      <section className='filters__species'>
        <label htmlFor='cats'>
          <input
            checked={speciesFilter === 'cat'}
            id="cats"
            type='radio'
            name='species'
            onChange={() => setSpeciesFilter('cat')}
          />
          Cats
        </label>
        <label htmlFor='dogs'>
          <input
            checked={speciesFilter === 'dog'}
            id="dogs"
            type='radio'
            name='species'
            onChange={() => setSpeciesFilter('dog')}
          />
          Dogs
        </label>
      </section>
      <section className='filters__selects'>
        <Filter
          id='order'
          items={['none', 'younger', 'older']}
          label='Order: '
          ref={orderRef}
          onChange={(e) => selectFilter(e, setOrderFilter)}
        />
        <Filter
          id='favorites'
          items={['all', 'favorites', 'non favorites']}
          label='Favorite status: '
          ref={favoriteRef}
          onChange={(e) => selectFilter(e, setFavoritesFilter)}
        />
      </section>
      <section className='filters__buttons'>
        <Button.Root
          ariaLabel='Clear filters'
          onClick={() => clearFilters()}
        >
          <Button.Label label='Clear filters' />
        </Button.Root>
        <Button.Root
          ariaLabel='Reset favorites'
          onClick={() => resetFavorites()}
        >
          <Button.Label label='Reset favorites' />
        </Button.Root>
      </section>
    </article>
  )
}

export default FiltersContainer