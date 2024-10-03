import { useEffect, useState } from "react";
import './App.scss';
import { catNames } from 'cat-names';

const MAX_PETS = 15;
const API_KEY: string = 'live_zllOBSsaSmrsLy6r2n5z2SQ7Zqz4NkckgTWwPzxZJr90rcoeMUpSleldcvpv8v9r';
const API_URL: string = `https://api.thecatapi.com/v1/images/search?limit=${MAX_PETS}&size=thumb `;

interface Pet {
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
  return item ? JSON.parse(item) : null
}

const addNameAndAgeToPet = (pets: Pet[]) => {
  pets.forEach((pet: Pet) => {
    const randomIndex = Math.round((Math.random() * 100));
    const name = catNames[randomIndex];

    const age = Math.round(Math.random() * 20);
    pet.name = name;
    pet.age = age;
  });
}

const fetchPetsFromAPI = async (url: string) => {
  const response = await fetch(url, {headers: {
    'x-api-key': API_KEY
  }});
  const data = await response.json();
  const filteredData = data.filter((pet: Pet) => pet.url.split('.').pop() !== 'gif');
  addNameAndAgeToPet(filteredData);  
  return filteredData;
}

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  
  useEffect(() => {
    const storagedPets = getLocalStorage('pets');
    if (!storagedPets || storagedPets.length === 0) {
      const fetchPets = async (url: string) => {
        const fetchedPets = await fetchPetsFromAPI(url);
        setPets(fetchedPets);
        setLocalStorage('pets', fetchedPets);
      }
      fetchPets(API_URL);
    } else {
      setPets(storagedPets);
    } 
  }, []);

  return (
    <>
      <h1>Pet adoption</h1>
      <main>
        {pets && pets.map(pet => (
          <div key={pet.id} className="card">
            <img alt="Picture of a cat" src={pet.url} />
            <h3>{pet.name}</h3>
            <p>Age: {pet.age}</p>
          </div>
        ))}
      </main>
    </>
  )
}

export default App
