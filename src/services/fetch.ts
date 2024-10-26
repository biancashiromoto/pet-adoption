import { Utils } from "./Utils";
import { PetData } from "../types/PetData";
import { info } from "./info";
import { Pets } from "../context/Provider";

const utils = new Utils();

export const fetchDogs = async () => {
  const response = await fetch(info.DOG_API_URL, {
    headers: { "x-api-key": info.DOG_API_KEY },
  });
  const data: PetData[] = await response.json();
  const filtered = utils.removeGifs(data);
  return utils.addPetsInfo(filtered);
};

export const fetchCats = async () => {
  const response = await fetch(info.CAT_API_URL, {
    headers: { "x-api-key": info.CAT_API_KEY },
  });
  const data: PetData[] = await response.json();
  const filtered = utils.removeGifs(data);
  return utils.addPetsInfo(filtered);
};

export const fetchPets = async (): Promise<Pets> => {
  const cats = await fetchCats();
  const dogs = await fetchDogs();
  return { cats, dogs };
};
