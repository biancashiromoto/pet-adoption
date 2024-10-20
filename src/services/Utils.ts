import { catNames } from 'cat-names';
import { PetData } from '../types/PetData';


export class Utils {
  /**
   * setLocalStorage
   */
  public setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * getLocalStorage
   */
  public getLocalStorage(key: string): any | null {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
  }

  /**
   * addPetsInfo
   */
  public addPetsInfo(pets: PetData[]): PetData[] {
    pets.forEach((pet: PetData) => {
      const randomIndex = Math.round((Math.random() * catNames.length + 10));
      let name = catNames[randomIndex];

      if (!name) {
        name = catNames[Math.floor(Math.random() * catNames.length)];
      }

      const age = Math.round(Math.random() * 19) + 1;

      pet.name = name;
      pet.age = age;
      pet.species = pet.url.includes('cat') ? 'cat' : 'dog';
      pet.isFavorite = false;
    });
    return pets;
  }
  
  /**
   * removeGifs
   */
  public removeGifs(pets: PetData[]): PetData[] {
    return pets.filter((pet: PetData) => !pet.url.endsWith('gif'));
  }

  public shuffleArray(array: PetData[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}