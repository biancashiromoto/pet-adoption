import { useContext, useEffect, useRef } from "react";
import FiltersContainer from "@/components/FiltersContainer";
import Loader from "@/components/Loader";
import { Context } from "@/context";
import useEscapeKeyClose from "@/hooks/useEscapeKeyClose";
import ModalAdoptPets from "@/components/ModalAdoptPets";
import ModalUpdatePets from "@/components/ModalUpdatePets";
import { Utils } from "@/helpers/Utils";
import useUpdatePageTitle from "@/hooks/useUpdatePageTitle";
import PetList from "@/components/PetList";
import useFilter from "@/hooks/useFilter";
import useFetchPets from "@/hooks/useFetchPets";

const utils = new Utils();

const Home = () => {
  const {
    pets,
    selectedPet,
    showAdoptionModal,
    setShowAdoptionModal,
    showUpdatePetsModal,
    setShowUpdatePetsModal,
    orderRef,
    favoriteRef,
    setSpeciesFilter,
  } = useContext(Context);
  const { isLoadingOrFetching, error, refetch } = useFetchPets();
  useEscapeKeyClose();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
  }, []);

  useUpdatePageTitle(
    showAdoptionModal && selectedPet.length > 0
      ? `Adopt ${selectedPet[0].name} | Pet Adoption`
      : "Home | Pet Adoption"
  );
  useFilter();
  useEscapeKeyClose();

  useEffect(() => {
    setShowUpdatePetsModal(false);
    setShowAdoptionModal(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        setSpeciesFilter("dog");
      } else {
        setSpeciesFilter("cat");
      }
    }
  };

  useEffect(() => {
    utils.setLocalStorage("pets", pets);
  }, [pets]);

  return (
    <div className="home">
      {error && <p>Error: {error.message}</p>}
      <FiltersContainer />
      <main
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoadingOrFetching && <Loader />}
        {!error && !isLoadingOrFetching && (
          <>
            <PetList />
            {showAdoptionModal && <ModalAdoptPets />}
            {showUpdatePetsModal && <ModalUpdatePets refetch={refetch} />}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
