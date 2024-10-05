import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";
import { Utils } from "../../helpers/Utils";
import { info } from "../../helpers/info";

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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [species, setSpecies] = useState<'dog' | 'cat' | ''>('');
    const [order, setOrder] = useState<'none' | 'older' | 'younger'>('none');

    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
      const storaged = utils.getLocalStorage('pets');     
      if (!storaged || storaged.length === 0) {
        const fetchPets = async (url: string) => {
          setIsLoading(true);
          try {
            const catsResponse = await fetch(url, {
              headers: { 'x-api-key': info.API_KEY }
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
        fetchPets(info.API_URL);
      } else {
        setPets(storaged);
        setDisplayedPets(storaged);
      }
    }, []);

    useEffect(() => {
      const filteredPets = [...pets].filter((pet: Pet) => pet.species === species);
      switch (species) {
        case '':
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

  return (
    <>
      {error && <p>Error: {error}</p>}
      <label htmlFor="species">
        Species: 
        <select id="species" onChange={(e) => {
          const value = e.target.value as "" | "dog" | "cat";
          setSpecies(value);
        }}>
          <option value="">Select species</option>
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
        </select>
      </label>
      <label htmlFor="sort">
        Sort: 
        <select id="sort" onChange={(e) => {
          const value = e.target.value as "none" | "older" | "younger";
          setOrder(value);
        }}>
          <option value="none">None</option>
          <option value="older">Older</option>
          <option value="younger">Younger</option>
        </select>
      </label>
      {isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <main>
            {displayedPets && displayedPets.map(pet => (
              <div key={pet.id} className="card" onClick={() => {
                setSelectedPet([pet]);
                setShowModal(true);
              }}>
                <img alt="Random picture of a cat" src={pet.url} />
                <h3>{pet.name}</h3>
                <p>Age: {pet.age}</p>
              </div>
            ))}
          </main>
          {showModal && (
            <>
              <Overlay setShowModal={setShowModal }/>
              <Modal
                title={`Go ahead and fill form to adopt ${selectedPet[0].name}?`}
              >
                <img alt="Random picture of a cat" src={selectedPet[0].url} />
                <div className="modal__buttons-container">
                  <Button.Root
                    ariaLabel="Yes"
                    onClick={() => navigate("/adopt")}
                  >
                    <Button.Label label="Yes" />
                  </Button.Root>
                  <Button.Root
                    ariaLabel="No"
                    onClick={() => setShowModal(false)}
                  >
                    <Button.Label label="No" />
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