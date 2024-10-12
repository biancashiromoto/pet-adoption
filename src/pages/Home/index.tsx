import { createRef, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/Overlay';
import { Utils } from '../../helpers/Utils';
import { info } from '../../helpers/info';
import Card from '../../components/Card';
import FiltersContainer from '../../components/FiltersContainer';
import Loader from '../../components/Loader';

export interface Pet {
  age?: number;
  id: string;
  isFavorite: boolean;
  height: number;
  name?: string;
  species?: 'cat' | 'dog';
  url: string;
  width: number;
}

const utils = new Utils();

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [displayedPets, setDisplayedPets] = useState<Pet[]>(pets);
  const [selectedPet, setSelectedPet] = useState<Pet[]>([]);
  const [showAdoptionModal, setShowAdoptionModal] = useState<boolean>(false);
  const [showUpdatePetsModal, setShowUpdatePetsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [orderFilter, setOrderFilter] = useState<'none' | 'older' | 'younger'>('none');
  const [favoritesFilter, setFavoritesFilter] = useState<'all' | 'favorites' | 'non favorites'>('all');
  const speciesRef = createRef<HTMLSelectElement>();
  const orderRef = createRef<HTMLSelectElement>();
  const favoriteRef = createRef<HTMLSelectElement>();

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const resetFavorites = () => {
    const updatedPets = pets.map((pet) => ({
      ...pet,
      isFavorite: false
    }));
    setPets(updatedPets);
    setDisplayedPets(updatedPets);
    utils.setLocalStorage('pets', updatedPets);
  };

  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const catsResponse = await fetch(info.CAT_API_URL, {
        headers: { 'x-api-key': info.CAT_API_KEY }
      });
      const dogsResponse = await fetch(info.DOG_API_URL, {
        headers: { 'x-api-key': info.DOG_API_KEY }
      });
      
      if (!catsResponse.ok || !dogsResponse.ok) {
        throw new Error('Failed to fetch');
      }
      
      const catsData = await catsResponse.json();
      const dogsData = await dogsResponse.json();
      
      const filteredCatsData = utils.removeGifs(catsData);
      const filteredDogsData = utils.removeGifs(dogsData)
      const allPets = filteredCatsData.concat(filteredDogsData);
      utils.addPetsInfo(allPets);
      utils.shuffleArray(allPets);

      setPets(allPets);
      setDisplayedPets(allPets);
      utils.setLocalStorage('pets', allPets);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const applyFilters = () => {
    let filteredPets = pets;

    if (speciesFilter !== 'all') {
      filteredPets = pets.filter((pet: Pet) => pet.species === speciesFilter);
    }

    if (favoritesFilter !== 'all') {
      if (favoritesFilter === 'favorites') {
        filteredPets = filteredPets.filter((pet: Pet) => pet.isFavorite);
      } else {
        filteredPets = filteredPets.filter((pet: Pet) => !pet.isFavorite);
      }
    }
    
    let orderedPets = filteredPets;
    if (orderFilter !== 'none') {
      orderedPets = [...filteredPets].sort((a: Pet, b: Pet) => {
        if (!a.age || !b.age) return 0;
        return orderFilter === 'younger' ? a.age - b.age : b.age - a.age;
      });
    }
    setDisplayedPets(orderedPets);
  };

  useEffect(() => {
    const storaged = utils.getLocalStorage('pets');
    if (!storaged || storaged.length === 0) {
      fetchPets();
    } else {
      setPets(storaged);
      setDisplayedPets(storaged);
    }
  }, []);
  
  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [pets, speciesFilter, orderFilter, favoritesFilter]);

  useEffect(() => console.log(pets), [pets]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showAdoptionModal) {
          setShowAdoptionModal(false);
        }
        if (showUpdatePetsModal) {
          setShowUpdatePetsModal(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdoptionModal, showUpdatePetsModal]);

  useEffect(() => {
    document.title = "Home | Pet Adoption";
  }, []);

  useEffect(() => {
    if (showAdoptionModal) {
      document.title = `Adopt ${selectedPet[0].name} | Pet Adoption`;
    }
  }, [showAdoptionModal]);

  const clearFilters = () => {
    setDisplayedPets(pets);
    setOrderFilter('none');
    setSpeciesFilter('all');
    setFavoritesFilter('all');

    if (speciesRef.current) {
      speciesRef.current.value = 'all';
    }
    
    if (orderRef.current) {
      orderRef.current.value = 'none';
    }

    if (favoriteRef.current) {
      favoriteRef.current.value = 'all';
    }
  }

  const toggleFavorite = (id: Pet['id']) => {
    setPets(prevPets => {
      const updatedPets = prevPets.map(pet => {
        if (pet.id === id) {
          return { ...pet, isFavorite: !pet.isFavorite };
        }
        return pet;
      });
      
      utils.setLocalStorage('pets', updatedPets);
      
      return updatedPets;
    });
  }

  return (
    <>
      {error && <p>Error: {error}</p>}
      <Button.Root
        ariaLabel='Update pets'
        onClick={() => setShowUpdatePetsModal(true)}
      >
        <Button.Label label='Update pets' />
      </Button.Root>
      <hr />
      <FiltersContainer
        clearFilters={clearFilters}
        orderRef={orderRef}
        setOrder={setOrderFilter}
        speciesRef={speciesRef}
        setSpecies={setSpeciesFilter}
        favoriteRef={favoriteRef}
        setFavoritesFilter={setFavoritesFilter}
        resetFavorites={resetFavorites}
      />
      <hr />
      {isLoading && <Loader />}
      {!error && !isLoading && (
        <>
          <main>
            {displayedPets && displayedPets.map(pet => (
              <Card
                key={pet.id}
                pet={pet}
                setSelectedPet={setSelectedPet}
                setShowModal={setShowAdoptionModal}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </main>
          {showAdoptionModal && (
            <>
              <Overlay openModal={setShowAdoptionModal} />
              <Modal
                title={`Would you like to adopt ${selectedPet[0].name}?`}
                text='You will be redirected to the adoption form'
              >
                <img alt={`Random picture of a ${selectedPet[0].species}`} src={selectedPet[0].url} />
                <div className='modal__buttons-container'>
                  <Button.Root
                    ariaLabel='Yes'
                    onClick={() => navigate('/adopt')}
                  >
                    <Button.Label label='Yes' />
                  </Button.Root>
                  <Button.Root
                    ariaLabel='No'
                    onClick={() => setShowAdoptionModal(false)}
                  >
                    <Button.Label label='No' />
                  </Button.Root>
                </div>
              </Modal>
            </>
          )}
          {showUpdatePetsModal && (
            <>
              <Overlay openModal={setShowUpdatePetsModal}/>
              <Modal
                text='Updating pets will remove the current list and fetch new ones. Do you want to continue?'
                title='Update pets?'
              >
                <div className='modal__buttons-container'>
                  <Button.Root
                    ariaLabel='Yes'
                    onClick={() => {
                      fetchPets();
                      setShowUpdatePetsModal(false);
                    }}
                  >
                    <Button.Label label='Yes' />
                  </Button.Root>
                  <Button.Root
                    ariaLabel='No'
                    onClick={() => setShowUpdatePetsModal(false)}
                  >
                    <Button.Label label='No' />
                  </Button.Root>
                </div>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Home;