import { useContext } from "react";
import { Context } from "../../context";
import { Button } from "../Button";
import Modal from "../Modal";
import Overlay from "../Overlay";

interface ModalUpdatePetsProps {
  refetch: () => void;
}

const ModalUpdatePets = ({ refetch }: ModalUpdatePetsProps) => {
  const { setShowUpdatePetsModal, showUpdatePetsModal } = useContext(Context);
  return (
    <>
      <Overlay openModal={setShowUpdatePetsModal} />
      <Modal
        isVisible={showUpdatePetsModal}
        onClose={() => setShowUpdatePetsModal(false)}
        className="modal"
        text="Updating pets will remove the current list and fetch new ones. Do you want to continue?"
        title="Update pets?"
      >
        <div className="modal__buttons-container">
          <Button.Root
            ariaLabel="Yes"
            onClick={() => {
              localStorage.removeItem("pets");
              refetch();
              setShowUpdatePetsModal(false);
            }}
          >
            <Button.Label label="Yes" />
          </Button.Root>
          <Button.Root
            ariaLabel="No"
            onClick={() => setShowUpdatePetsModal(false)}
          >
            <Button.Label label="No" />
          </Button.Root>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdatePets;
