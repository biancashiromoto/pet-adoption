import { catNames } from "cat-names";
import { Pet } from "@/types/Pet.type";

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
  public getLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
  }

  /**
   * addPetsInfo
   */
  public addPetsInfo(pets: Pet[]): Pet[] {
    pets.forEach((pet: Pet) => {
      const randomIndex = Math.round(Math.random() * catNames.length + 10);
      let name = catNames[randomIndex];

      if (!name) {
        name = catNames[Math.floor(Math.random() * catNames.length)];
      }

      const age = Math.round(Math.random() * 19) + 1;

      pet.name = name;
      pet.age = age;
      pet.species = pet.url.includes("cat") ? "cat" : "dog";
      pet.isFavorite = false;
    });
    return pets;
  }

  /**
   * removeGifs
   */
  public removeGifs(pets: Pet[]): Pet[] {
    return pets.filter((pet: Pet) => pet.url.split(".").pop() !== "gif");
  }

  /**
   * formatPetsData
   */
  public formatPetsData(pets: Pet[]): Pet[] {
    return this.addPetsInfo(this.removeGifs(pets)) || [];
  }
}
