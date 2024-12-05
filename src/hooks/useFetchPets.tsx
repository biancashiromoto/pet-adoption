import { Context } from "@/context";
import fetchPets from "@/services/fetchPets";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const useFetchPets = () => {
  const { setPets } = useContext(Context);
  const [isLoadingOrFetching, setIsLoadingOrFetching] = useState(true);

  const {
    isLoading,
    isFetching,
    error,
    data: fetchedPets,
    refetch,
  } = useQuery({
    queryKey: ["fetchedPets"],
    queryFn: fetchPets,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  if (fetchedPets) {
    setPets(fetchedPets);
  }

  useEffect(() => {
    setIsLoadingOrFetching(isFetching || isLoading);
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (fetchedPets) {
      setPets(fetchedPets);
    }
    setIsLoadingOrFetching(!fetchedPets && !error);
  }, [fetchedPets, error]);

  return {
    isLoadingOrFetching,
    error,
    data: fetchedPets,
    refetch,
  };
};

export default useFetchPets;
