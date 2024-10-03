import { useEffect, useState } from "react";
import './App.css';
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

const fetchPetsFromAPI = async (url: string) => {
  const response = await fetch(url, {headers: {
    'x-api-key': API_KEY
  }});
  const data = await response.json();
  const filteredData = data.filter((pet: Pet) => pet.url.split('.').pop() !== 'gif');
  filteredData.forEach((pet: Pet) => {
    const randomIndex = Math.round((Math.random() * 100));
    const name = catNames[randomIndex];
    pet.name = name;    
  });
  
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

  useEffect(() => console.log(pets), [pets])

  return (
    <main>
      <h1>Pet adoption</h1>
      {pets && pets.map(pet => (
        <div key={pet.id}>
          <img alt="Picture of a cat" src={pet.url} />
          <h3>{pet.name}</h3>
        </div>
      ))}
    </main>
  )
}

export default App
