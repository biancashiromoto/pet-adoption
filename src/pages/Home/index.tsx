import { createRef, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/Overlay';
import { Utils } from '../../helpers/Utils';
import { info } from '../../helpers/info';
import Filter from '../../components/Filter';
import Card from '../../components/Card';

export interface Pet {
  age?: number;
  id: string;
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
  const [species, setSpecies] = useState<'none' | 'dog' | 'cat'>('none');
  const [order, setOrder] = useState<'none' | 'older' | 'younger'>('none');
  const speciesRef = createRef<HTMLSelectElement>();
  const orderRef = createRef<HTMLSelectElement>();

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

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
    const filteredPets = [...pets].filter((pet: Pet) => pet.species === species);
    switch (species) {
      case 'none':
        setDisplayedPets(pets);
        break;
      default:
        setDisplayedPets(filteredPets);
        break;
    }
  }, [pets, species]);

  useEffect(() => {
    let orderedPets;
    switch (order) {
      case 'younger':
        orderedPets = [...pets].sort((a: Pet, b: Pet) => {
          if (!a.age || !b.age) return 0;
          return a.age - b.age;
        });
        setDisplayedPets(orderedPets);
        break;
      case 'older':
        orderedPets = [...pets].sort((a: Pet, b: Pet) => {
          if (!a.age || !b.age) return 0;
          return b.age - a.age;
        });
        setDisplayedPets(orderedPets);
        break;
      default:
        setDisplayedPets(pets);
        break;
    }
  }, [pets, order]);

  const clearFilters = () => {
    setDisplayedPets(pets);
    setOrder('none');
    setSpecies('none');

    if (speciesRef.current) {
      speciesRef.current.value = '';
    }
    if (orderRef.current) {
      orderRef.current.value = 'none';
    }
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
      <Filter
        clearFilters={clearFilters}
        orderRef={orderRef}
        setOrder={setOrder}
        setSpecies={setSpecies}
        speciesRef={speciesRef}
       />
      {isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <main>
            {displayedPets && displayedPets.map(pet => (
              <Card pet={pet} setSelectedPet={setSelectedPet} setShowModal={setShowAdoptionModal} />
            ))}
          </main>
          {showAdoptionModal && (
            <>
              <Overlay openModal={setShowAdoptionModal} />
              <Modal
                title={`Go ahead and fill form to adopt ${selectedPet[0].name}?`}
              >
                <img alt='Random picture of a cat' src={selectedPet[0].url} />
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
                text='This action will fetch new pets and the current pets will be lost. Do you want to proceed?'
                title='Update pets?'
              >
                <div className='modal__buttons-container'>
                  <Button.Root
                    ariaLabel='Yes'
                    onClick={() => fetchPets()}
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