import { useContext, useEffect } from 'react';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/Overlay';
import Card from '../../components/Card';
import FiltersContainer from '../../components/FiltersContainer';
import Loader from '../../components/Loader';
import { Pet } from '../../types/Pet';
import { Context } from '../../context';
import { fetchCats, fetchDogs } from '../../services/fetch';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
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
    species
  } = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
  }, []);

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

    if (showAdoptionModal) {
      document.title = `Adopt ${selectedPet[0].name} | Pet Adoption`;
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdoptionModal, showUpdatePetsModal]);

  useEffect(() => {
    document.title = "Home | Pet Adoption";
  }, []);

  const {
    data: cats,
    isLoading: isLoadingCats,
    isFetching: isFetchingCats,
    error: fetchErrorCats,
    refetch: refetchCats
  } = useQuery({
    queryKey: ['fetchCats'],
    queryFn: async () => {
      const fetchedCats = await fetchCats();
      setPets({ ...pets, cats: fetchedCats });
      setDisplayedPets({ ...pets, cats: fetchedCats });
      return fetchedCats;     
    },
    staleTime: Infinity,
  });

  const {
    data: dogs,
    isLoading: isLoadingDogs,
    isFetching: isFetchingDogs,
    error: fetchErrorDogs,
    refetch: refetchDogs
  } = useQuery({
    queryKey: ['fetchDogs'],
    queryFn: async () => {
      const fetchedDogs = await fetchDogs();
      setPets({ ...pets, dogs: fetchedDogs });
      setDisplayedPets({ ...pets, dogs: fetchedDogs });
      return fetchedDogs;     
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (cats && dogs) {
      setPets({ cats, dogs });
      setDisplayedPets({ cats, dogs });
    }
  }, [cats, dogs]);

  return (
    <>
      {fetchErrorDogs && fetchErrorCats && <p>Error: {species === 'cats' ? fetchErrorCats.message : fetchErrorDogs.message}</p>}
      <Button.Root
        ariaLabel='Update pets'
        onClick={() => {
          setShowUpdatePetsModal(true);
          refetchCats();
          refetchDogs();
        }}
      >
        <Button.Label label='Update pets' />
      </Button.Root>
      <hr />
      <FiltersContainer />
      <hr />
      {(isLoadingCats || isFetchingCats) || (isLoadingDogs || isFetchingDogs) && <Loader />}
      {!fetchErrorDogs && !fetchErrorCats && !isLoadingCats && !isLoadingDogs && (
        <>
          <main>
            {displayedPets && displayedPets[species].map((pet: Pet) => (
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
                      // fetchPets();
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