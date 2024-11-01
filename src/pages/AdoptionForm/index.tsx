import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import Overlay from "../../components/Overlay";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

const AdoptionForm = () => {
  const { selectedPet } = useContext(Context);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  useEffect(() => {
    document.title = `Form | Adopt ${selectedPet[0].name}`;
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <p>{`You are filling the form to adopt ${selectedPet[0].name}.`}</p>
        <img
          src={selectedPet[0].url}
          alt={`${selectedPet[0].name}'s picture`}
        />
        <label htmlFor="input__first-name">
          First name:
          <input required type="text" id="input__first-name" autoFocus />
        </label>
        <label htmlFor="input__last-name">
          Last name:
          <input required type="text" id="input__last-name" />
        </label>
        <label htmlFor="input__email">
          Email:
          <input required type="email" id="input__email" />
        </label>
        <label htmlFor="input__phone-number">
          Phone number:
          <input required type="tel" id="input__phone-number" />
        </label>
        <label htmlFor="input__birth-date">
          Birth date:
          <input required type="date" id="input__birth-date" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {showModal && (
        <>
          <Overlay openModal={setShowModal} />
          <Modal
            title="Thank you for submitting!"
            text="We will contact you as soon as possible"
          >
            <div className="modal__buttons-container">
              <Button.Root
                ariaLabel="ok"
                onClick={() => {
                  setShowModal(false);
                  navigate("/");
                }}
              >
                <Button.Label label="Ok" />
              </Button.Root>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default AdoptionForm;
