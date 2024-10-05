import { Pet } from "../pages/Home";
import { catNames } from 'cat-names';


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
  public getLocalStorage(key: string): Pet[] | null {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
  }

  /**
   * addPetsInfo
   */
  public addPetsInfo(pets: Pet[]): Pet[] {
    pets.forEach((pet: Pet) => {
      const randomIndex = Math.round((Math.random() * catNames.length));
      const name = catNames[randomIndex];
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
  public removeGifs(pets: Pet[]): Pet[] {
    return pets.filter((pet: Pet) => pet.url.split('.').pop() !== 'gif');
  }
}