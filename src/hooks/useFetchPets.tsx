import { useQuery } from "@tanstack/react-query";
import { Utils } from "../services/Utils";
import { Pets } from "../context/Provider";
import { fetchPets } from "../services/fetch";

const utils = new Utils();
const localPets = utils.getLocalStorage('pets') as unknown as Pets;

const useFetchPets = () => {
  const {
    data: pets,
    isLoading,
    isFetching,
    error,
    refetch: refetchPets,
  } = useQuery({
    queryKey: ['fetchPets'],
    queryFn: fetchPets,
    staleTime: Infinity,
    enabled: !localPets || !localPets.cats || !localPets.dogs
  });
  return { pets, isLoading, isFetching, error, refetchPets };
}

export default useFetchPets