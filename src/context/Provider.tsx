import { useState, ReactNode } from 'react';
import { Context } from '.';
import { PetData } from '../types/PetData';
import { ContextProps } from './index.types';
import { FavoritesFilter, OrderByAgeFilter, SpeciesFilter } from '../components/FiltersContainer/index.types';

export type Pets = {
  dogs: PetData[];
  cats: PetData[];
};

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pets>({ cats: [], dogs: [] });
  const [displayedPets, setDisplayedPets] = useState<Pets>({ cats: [], dogs: [] });
  const [selectedPet, setSelectedPet] = useState<PetData[]>([]);
  const [showAdoptionModal, setShowAdoptionModal] = useState<boolean>(false);
  const [showUpdatePetsModal, setShowUpdatePetsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>('cats');
  const [orderFilter, setOrderFilter] = useState<OrderByAgeFilter>('none');
  const [favoritesFilter, setFavoritesFilter] = useState<FavoritesFilter>('all');
  const [error, setError] = useState<string>('');
  const [species, setSpecies] = useState<SpeciesFilter>('cats');

  const value: ContextProps = {
    pets,
    setPets,
    displayedPets,
    setDisplayedPets,
    selectedPet,
    setSelectedPet,
    showAdoptionModal,
    setShowAdoptionModal,
    showUpdatePetsModal,
    setShowUpdatePetsModal,
    isLoading,
    setIsLoading,
    speciesFilter,
    setSpeciesFilter,
    orderFilter,
    setOrderFilter,
    favoritesFilter,
    setFavoritesFilter,
    error,
    setError,
    species,
    setSpecies,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export default Provider;