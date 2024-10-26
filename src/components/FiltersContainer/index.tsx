import { useContext } from 'react';
import Filter from '../Filter';
import SpeciesFilter from '../SpeciesFilter';
import { FiltersContainerProps, OrderByAgeFilter } from './index.types';
import { Context } from '../../context';
import { Button } from '../Button';
import { PetData } from '../../types/PetData';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';

const FiltersContainer = ({ orderByAgeRef }: FiltersContainerProps) => {
  const { setOrder, pets, setPets } = useContext(Context);
  useSetLocalStorage();

  const clearFilters = () => {
    setOrder('none');
    if (orderByAgeRef?.current) {
      orderByAgeRef.current.value = 'none';
    }
  };

  const resetFavorites = () => {
    const { cats, dogs } = pets;
    const updatedPets = [...cats, ...dogs].map((pet: PetData) => ({
      ...pet,
      isFavorite: false
    }));
    
    setPets({
      cats: updatedPets.filter((pet: PetData) => pet.species === 'cat'),
      dogs: updatedPets.filter((pet: PetData) => pet.species === 'dog'),
    });
  }
  
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
      <Button.Root
        onClick={() => resetFavorites()}
        ariaLabel='Reset favorites'
        className='button__reset-favorites'
        disabled={false}
      >
        <Button.Label label='Reset favorites' />
      </Button.Root>
    </article>
  );
};

export default FiltersContainer;
