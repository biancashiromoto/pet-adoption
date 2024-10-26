import { createRef, RefObject, useContext, useEffect } from 'react';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/Overlay';
import Card from '../../components/Card';
import FiltersContainer from '../../components/FiltersContainer';
import Loader from '../../components/Loader';
import { PetData } from '../../types/PetData';
import { Context } from '../../context';
import useFavorites from '../../hooks/useFavorites';
import useFetchPets from '../../hooks/useFetchPets';
import useAdoptionModal from '../../hooks/useAdoptionModal';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import { Pets } from '../../context/Provider';

const Home = () => {
  const {
    displayedPets,
    setDisplayedPets,
    selectedPet,
    showAdoptionModal,
    setShowAdoptionModal,
    showUpdatePetsModal,
    setShowUpdatePetsModal,
    species,
    order,
    pets
  } = useContext(Context);
  const navigate = useNavigate();
  const { toggleFavorite } = useFavorites();
  const { isLoading, isFetching, error, refetchPets } = useFetchPets();
  const orderByAgeRef: RefObject<HTMLSelectElement> = createRef();
  useAdoptionModal();
  useSetLocalStorage();

  const applyFilters = () => {
    const { dogs, cats } = pets as Pets;
    let orderedPets: PetData[] = [];
    if (order !== 'none') {
      orderedPets = [...dogs, ...cats].sort((a: PetData, b: PetData) => {
        if (!a.age || !b.age) return 0;
        return order === 'younger' ? a.age - b.age : b.age - a.age;
      });

      setDisplayedPets({
        cats: orderedPets.filter((pet: PetData) => pet.species === 'cat'),
        dogs: orderedPets.filter((pet: PetData) => pet.species === 'dog')
      });
    } else {
      setDisplayedPets({ cats, dogs });
    }
  }

  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
    document.title = "Home | Pet Adoption";
  }, []);

  useEffect(() => {
    applyFilters();
  }, [order]);

  useEffect(() => {
    setDisplayedPets(pets);
  }, [pets]);

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
      <FiltersContainer
        orderByAgeRef={orderByAgeRef}
      />
      <hr />
      {(isLoading || isFetching) && <Loader />}
        <>
          <main>
            {!isFetching && displayedPets && !Array.isArray(displayedPets) && displayedPets[species]?.map((pet: PetData) => (
              <Card
                key={pet.id}
                pet={pet}
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