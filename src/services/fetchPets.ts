import { info } from "../helpers/info";
import { Utils } from "../helpers/Utils";

const utils = new Utils();

const fetchPets = async () => {
  const catsResponse = await fetch(info.CAT_API_URL, {
    headers: { "x-api-key": info.CAT_API_KEY },
  });
  const dogsResponse = await fetch(info.DOG_API_URL, {
    headers: { "x-api-key": info.DOG_API_KEY },
  });

  if (!catsResponse.ok || !dogsResponse.ok) {
    throw new Error("Failed to fetch");
  }

  const catsData = await catsResponse.json();
  const dogsData = await dogsResponse.json();

  const formatted = utils.formatPetsData([...catsData, ...dogsData]);

  return formatted;
};

export default fetchPets;
