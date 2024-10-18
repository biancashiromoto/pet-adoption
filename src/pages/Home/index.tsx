import { createRef, useContext, useEffect } from 'react';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/Overlay';
import { Utils } from '../../services/Utils';
import Card from '../../components/Card';
import FiltersContainer from '../../components/FiltersContainer';
import Loader from '../../components/Loader';
import { Pet } from '../../types/Pet';
import { Context } from '../../context';
import { useQuery } from '@tanstack/react-query';
import { fetchCats, fetchDogs } from '../../services/fetch';

const utils = new Utils();

const Home = () => {
  const speciesRef = createRef<HTMLSelectElement>();
  const orderRef = createRef<HTMLSelectElement>();
  const favoriteRef = createRef<HTMLSelectElement>();
  const {
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
  } = useContext(Context);
  const navigate = useNavigate();

  const resetFavorites = () => {
    const updatedPets = pets.map((pet: Pet) => ({
      ...pet,
      isFavorite: false
    }));
    setPets(updatedPets);
    setDisplayedPets(updatedPets);
    utils.setLocalStorage('pets', updatedPets);
  };

  const applyFilters = (pets: Pet[]) => {
    let filteredPets = pets;
    
    let orderedPets = filteredPets;
    if (orderFilter !== 'none') {
      orderedPets = filteredPets && [...filteredPets].sort((a: Pet, b: Pet) => {
        if (!a.age || !b.age) return 0;
        return orderFilter === 'younger' ? a.age - b.age : b.age - a.age;
      });
    }
    setDisplayedPets(orderedPets);
  };
  
  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
    document.title = "Home | Pet Adoption";
  }, []);

  useEffect(() => {
    if (showAdoptionModal) {
      document.title = `Adopt ${selectedPet[0].name} | Pet Adoption`;
    }

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

  const { data: cats, isLoading: isLoadingCats, error: fetchErrorCats } = useQuery({
    queryKey: ['fetchCats'],
    queryFn: fetchCats
  });

  const { data: dogs, isLoading: isLoadingDogs, error: fetchErrorDogs } = useQuery({
    queryKey: ['fetchDogs'],
    queryFn: fetchDogs,
    enabled: speciesFilter === 'dog'
  });
  
  if (isLoadingCats || isLoadingDogs) {
    setIsLoading(true);
  } else {
    setIsLoading(false);
  }

  const clearFilters = () => {
    setOrderFilter('none');
    setFavoritesFilter('all');
    
    if (orderRef.current) {
      orderRef.current.value = 'none';
    }

    if (favoriteRef.current) {
      favoriteRef.current.value = 'all';
    }
  }

  useEffect(() => {
    applyFilters(displayedPets);
  }, [favoritesFilter, orderFilter]);

  useEffect(() => {
    if (speciesFilter === 'cat') {
      setDisplayedPets(cats || []);
    } else {
      setDisplayedPets(dogs || []);
    }
  }, [dogs, cats, speciesFilter]);

  useEffect(() => {
    clearFilters();
  }, [speciesFilter])

  return (
    <>
      {speciesFilter === 'cat' ? (
        fetchErrorCats && <p>Error: {fetchErrorCats.message}</p>
      ) : (
        fetchErrorDogs && <p>Error: {fetchErrorDogs.message}</p>
      )}
      <section>
        <label htmlFor='cats'>
          Cats
          <input
            checked={speciesFilter === 'cat'}
            id="cats"
            type='radio'
            name='species'
            onChange={() => setSpeciesFilter('cat')}
          />
        </label>
        <label htmlFor='dogs'>
          Dogs
          <input
            checked={speciesFilter === 'dog'}
            id="dogs"
            type='radio'
            name='species'
            onChange={() => setSpeciesFilter('dog')}
          />
        </label>
      </section>
      <hr />
      <FiltersContainer
        clearFilters={clearFilters}
        orderRef={orderRef}
        speciesRef={speciesRef}
        favoriteRef={favoriteRef}
        resetFavorites={resetFavorites}
      />
      <hr />
      {isLoading && <Loader />}
      {!fetchErrorCats && !fetchErrorDogs && !isLoading && (
        <>
          <main>
            {displayedPets.map((pet: Pet) => (
              <Card
                key={pet.id}
                pet={pet}
                setSelectedPet={setSelectedPet}
                setShowModal={setShowAdoptionModal}
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
        </>
      )}
    </>
  )
}

export default Home;