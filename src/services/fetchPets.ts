import { info } from "@/helpers/info";
import { Utils } from "@/helpers/Utils";
import { Pet } from "@/types/Pet.type";

const utils = new Utils();

const fetchPets = async (): Promise<Pet[]> => {
  const [catsResponse, dogsResponse] = await Promise.all([
    fetch(info.CAT_API_URL, {
      headers: { "x-api-key": info.CAT_API_KEY },
    }),
    fetch(info.DOG_API_URL, {
      headers: { "x-api-key": info.DOG_API_KEY },
    }),
  ]);

  if (!catsResponse.ok || !dogsResponse.ok) {
    throw new Error("Failed to fetch");
  }

  const [catsData, dogsData] = await Promise.all([
    catsResponse.json(),
    dogsResponse.json(),
  ]);

  const formattedPets = utils.formatPetsData([...catsData, ...dogsData]);

  return formattedPets;
};

export default fetchPets;
