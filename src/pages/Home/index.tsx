import { useContext, useEffect } from "react";
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
import useClearFilters from "@/hooks/useClearFilters";
import useResetFavorites from "@/hooks/useResetFavorites";

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
  } = useContext(Context);
  const { isLoadingOrFetching, error, refetch } = useFetchPets();
  const { clearFilters } = useClearFilters();
  const { resetFavorites } = useResetFavorites();

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

  useEffect(() => {
    utils.setLocalStorage("pets", pets);
  }, [pets]);

  return (
    <div className="home">
      {error && <p>Error: {error.message}</p>}
      <FiltersContainer
        clearFilters={clearFilters}
        orderRef={orderRef}
        favoriteRef={favoriteRef}
        resetFavorites={resetFavorites}
      />
      <main>
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
