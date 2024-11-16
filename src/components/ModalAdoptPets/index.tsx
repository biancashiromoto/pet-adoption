import { useContext } from "react";
import Modal from "@/components/Modal";
import Overlay from "@/components/Overlay";
import { Context } from "@/context";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";

const ModalAdoptPets = () => {
  const { setShowAdoptionModal, selectedPet } = useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <Overlay openModal={setShowAdoptionModal} />
      <Modal
        title={`Would you like to adopt ${selectedPet[0].name}?`}
        text="You will be redirected to the adoption form"
      >
        <img
          alt={`Random picture of a ${selectedPet[0].species}`}
          src={selectedPet[0].url}
        />
        <div className="modal__buttons-container">
          <Button.Root ariaLabel="Yes" onClick={() => navigate("/adopt")}>
            <Button.Label label="Yes" />
          </Button.Root>
          <Button.Root
            ariaLabel="No"
            onClick={() => setShowAdoptionModal(false)}
          >
            <Button.Label label="No" />
          </Button.Root>
        </div>
      </Modal>
    </>
  );
};

export default ModalAdoptPets;
