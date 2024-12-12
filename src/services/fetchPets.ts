import { API_KEYS } from "@/helpers/info";
import { Utils } from "@/helpers/Utils";
import { Species } from "@/types/Filters.type";
import { Pet } from "@/types/Pet.type";

const utils = new Utils();

const MAX_PETS: number = 25;

const fetchPets = async (species: Species): Promise<Pet[]> => {
  const apiUrl = `https://api.the${species}api.com/v1/images/search?limit=${MAX_PETS}&size=thumb`;

  const response = await fetch(apiUrl, {
    headers: {
      "x-api-key": API_KEYS[species],
    },
  });

  if (!response.ok) {
    throw new Error(`Invalid species: ${species}`);
  }

  const result = await response.json();
  return utils.formatPetsData(await result);
};

export default fetchPets;
