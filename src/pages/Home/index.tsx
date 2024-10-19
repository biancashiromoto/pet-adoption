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
import { Utils } from '../../services/Utils';

const utils = new Utils();

const Home = () => {
  const {
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
    document.title = "Home | Pet Adoption";
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

  const {
    data: pets,
    isLoading,
    isFetching,
    error,
    refetch: refetchPets
  } = useQuery({
    queryKey: ['fetchPets'],
    queryFn: async () => {
      const localPets = utils.getLocalStorage('pets');
        if (!localPets) {
          const fetchedCats = await fetchCats();
          const fetchedDogs = await fetchDogs();
          const fetchedPets = { dogs: fetchedDogs, cats: fetchedCats };
          setDisplayedPets(fetchedPets);
          return fetchedPets;
        }
        return localPets;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    utils.setLocalStorage('pets', pets);
  }, [pets]);

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      <Button.Root
        ariaLabel='Update pets'
        onClick={() => {
          setShowUpdatePetsModal(true);
        }}
      >
        <Button.Label label='Update pets' />
      </Button.Root>
      <hr />
      <FiltersContainer />
      <hr />
      {(isLoading || isFetching) && <Loader />}
        <>
          <main>
            {!isFetching && pets && !Array.isArray(pets) && pets[species]?.map((pet: Pet) => (
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
                      localStorage.removeItem('pets');
                      refetchPets();
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
    </>
  )
}

export default Home;