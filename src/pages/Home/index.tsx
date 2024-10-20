import { useContext, useEffect } from 'react';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/Overlay';
import Card from '../../components/Card';
import FiltersContainer from '../../components/FiltersContainer';
import Loader from '../../components/Loader';
import { PetData } from '../../types/PetData';
import { Context } from '../../context';
import { fetchPets } from '../../services/fetch';
import { useQuery } from '@tanstack/react-query';
import { Utils } from '../../services/Utils';
import { Pets } from '../../context/Provider';
import useFavorites from '../../hooks/useFavorites';

const utils = new Utils();

const Home = () => {
  const {
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
  const localPets = utils.getLocalStorage('pets') as unknown as Pets;
  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
    document.title = "Home | Pet Adoption";
    if (localPets) {
      setDisplayedPets(localPets);
    }
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
    refetch: refetchPets,
  } = useQuery({
    queryKey: ['fetchPets'],
    queryFn: fetchPets,
    staleTime: Infinity,
    enabled: !localPets || !localPets.cats || !localPets.dogs
  });

  useEffect(() => {
    if (!pets) return;
    setDisplayedPets(pets);
  }, [pets]);

  useEffect(() => {
    utils.setLocalStorage('pets', displayedPets);
  }, [displayedPets]);

  return (
    <>
      {error && <p>Error: {error.message}</p>}
      <Button.Root
        disabled={isFetching || isLoading}
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
            {!isFetching && displayedPets && !Array.isArray(displayedPets) && displayedPets[species]?.map((pet: PetData) => (
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
                    disabled={false}
                    ariaLabel='Yes'
                    onClick={() => navigate('/adopt')}
                  >
                    <Button.Label label='Yes' />
                  </Button.Root>
                  <Button.Root
                    disabled={false}
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
                    disabled={false}
                    ariaLabel='Yes'
                    onClick={async () => {
                      localStorage.removeItem('pets');
                      setShowUpdatePetsModal(false);
                      refetchPets();
                    }}
                  >
                    <Button.Label label='Yes' />
                  </Button.Root>
                  <Button.Root
                    disabled={false}
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