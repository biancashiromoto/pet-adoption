import { Context } from "@/context";
import fetchPets from "@/services/fetchPets";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const useFetchPets = () => {
  const { setPets } = useContext(Context);
  const [isLoadingOrFetching, setIsLoadingOrFetching] = useState(false);

  const {
    isLoading,
    isFetching,
    error,
    data: fetchedPets,
    refetch,
  } = useQuery({
    queryKey: ["fetchPets"],
    queryFn: fetchPets,
  });

  useEffect(() => {
    setIsLoadingOrFetching(isFetching || isLoading);
  }, [isFetching, isLoading]);

  useEffect(() => {
    setPets(fetchedPets || []);
  }, [fetchedPets]);

  return {
    isLoadingOrFetching,
    error,
    data: fetchedPets,
    refetch,
  };
};

export default useFetchPets;
