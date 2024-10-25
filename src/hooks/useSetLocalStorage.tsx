import { useContext, useEffect } from "react";
import { Context } from "../context";
import { Utils } from "../services/Utils";
import { Pets } from "../context/Provider";

const utils = new Utils();
const localPets = utils.getLocalStorage('pets') as unknown as Pets;

const useSetLocalStorage = () => {
  const {
    displayedPets,
    setDisplayedPets,
    species
  } = useContext(Context);

  useEffect(() => {
    utils.setLocalStorage('species', species);
  }, [species]);

  useEffect(() => {
    utils.setLocalStorage('pets', displayedPets);
  }, [displayedPets]);

  useEffect(() => {
    if (localPets) {
      setDisplayedPets(localPets);
    }
  }, []);
}

export default useSetLocalStorage