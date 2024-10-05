import { useEffect, useState } from "react";
import { catNames } from 'cat-names';
import Modal from "../../components/Modal";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";

const MAX_PETS = 15;
const API_KEY: string = 'live_zllOBSsaSmrsLy6r2n5z2SQ7Zqz4NkckgTWwPzxZJr90rcoeMUpSleldcvpv8v9r';
const API_URL: string = `https://api.thecatapi.com/v1/images/search?limit=${MAX_PETS}&size=thumb `;

export interface Pet {
  age?: number;
  id: string;
  height: number;
  name?: string;
  url: string;
  width: number;
}

const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (key: string): any | null => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
  return null;
}

const addNameAndAgeToPets = (pets: Pet[]) => {
  pets.forEach((pet: Pet) => {
    const randomIndex = Math.round((Math.random() * catNames.length));
    const name = catNames[randomIndex];

    const age = Math.round(Math.random() * 19) + 1;
    pet.name = name;
    pet.age = age;
  });
}

const Home = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
      const storaged = getLocalStorage('pets');
      if (!storaged || storaged.length === 0) {
        const fetchPets = async (url: string) => {
          setIsLoading(true);
          try {
            const response = await fetch(url, {
              headers: { 'x-api-key': API_KEY }
            });
            
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            
            const data = await response.json();
            const filteredData = data.filter((pet: Pet) => pet.url.split('.').pop() !== 'gif');
            addNameAndAgeToPets(filteredData);
            setPets(filteredData);
            setLocalStorage('pets', filteredData);
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
        fetchPets(API_URL);
      }
      setPets(storaged);
    }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!error && !isLoading && (
        <>
          <main>
            {pets && pets.map(pet => (
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