import { Utils } from "./Utils";
import { Pet } from "../types/Pet";
import { info } from "./info";

const utils = new Utils();

export const fetchDogs = async () => {
  const response = await fetch(info.DOG_API_URL, {
    headers: { 'x-api-key': info.DOG_API_KEY },
  });
  const data: Pet[] = await response.json();
  const filtered = utils.removeGifs(data);
  return utils.addPetsInfo(filtered);
};

export const fetchCats = async () => {
  const response = await fetch(info.CAT_API_URL, {
    headers: { 'x-api-key': info.CAT_API_KEY },
  });
  const data: Pet[] = await response.json();
  const filtered = utils.removeGifs(data);
  return utils.addPetsInfo(filtered);
}