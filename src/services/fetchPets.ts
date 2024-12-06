import { info } from "@/helpers/info";
import { Utils } from "@/helpers/Utils";
import { Species } from "@/types/Filters.type";
import { Pet } from "@/types/Pet.type";

const utils = new Utils();

const apiKeyMap: Record<string, string> = {
  CAT: info.CAT_API_URL,
  DOG: info.DOG_API_URL,
};

const fetchPets = async (species: Species): Promise<Pet[]> => {
  const speciesKey = species.toUpperCase();
  const apiKey: string = apiKeyMap[speciesKey];

  if (!apiKey) {
    throw new Error(`Invalid species: ${speciesKey}`);
  }

  const response = (await fetch(apiKey)).json();
  return utils.formatPetsData(await response);
};

export default fetchPets;
