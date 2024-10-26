import { useQuery } from "@tanstack/react-query";
import { Utils } from "../services/Utils";
import { Pets } from "../context/Provider";
import { fetchPets } from "../services/fetch";
import { useContext, useEffect } from "react";
import { Context } from "../context";

const utils = new Utils();
const localPets = utils.getLocalStorage("pets") as unknown as Pets;

const useFetchPets = () => {
  const { setPets } = useContext(Context);
  const {
    data: fetchedPets,
    isLoading,
    isFetching,
    error,
    refetch: refetchPets,
  } = useQuery({
    queryKey: ["fetchPets"],
    queryFn: fetchPets,
    staleTime: Infinity,
    enabled: !localPets || !localPets.cats || !localPets.dogs,
  });

  useEffect(() => fetchedPets && setPets(fetchedPets), [fetchedPets]);

  return { fetchedPets, isLoading, isFetching, error, refetchPets };
};

export default useFetchPets;
