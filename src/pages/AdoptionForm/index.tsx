import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import Overlay from "@/components/Overlay";
import { useNavigate } from "react-router-dom";
import { Context } from "@/context";

const AdoptionForm = () => {
  const { selectedPets } = useContext(Context);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showPageNotFoundScreen, setShowPageNotFoundScreen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showConfirmationModal) {
        setShowConfirmationModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showConfirmationModal]);

  useEffect(() => {
    if (selectedPets.length === 0) {
      setShowPageNotFoundScreen(true);
    }
    document.title = `Form | Adopt ${selectedPets[0]?.name}`;
    nameRef.current && nameRef.current.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  return (
    <main className="adoption-form">
      {showPageNotFoundScreen ? (
        <article>
          <h2>Oops...</h2>
          <p>Page not found!</p>
        </article>
      ) : (
        <>
          <article className="selected-pet">
            <p>{`You are filling the form to adopt ${selectedPets[0]?.name}`}</p>
            <img
              className="selected-pet__image"
              src={selectedPets[0]?.url}
              alt={`${selectedPets[0]?.name}'s picture`}
            />
          </article>
          <form className="form" onSubmit={handleSubmit}>
            <section className="name">
              <label
                htmlFor="input__first-name"
                className="input input__first-name"
              >
                First name:
                <input
                  required
                  type="text"
                  id="input__first-name"
                  ref={nameRef}
                />
              </label>
              <label
                htmlFor="input__last-name"
                className="input input__last-name"
              >
                Last name:
                <input required type="text" id="input__last-name" />
              </label>
            </section>
            <article className="email-phone-birth">
              <label htmlFor="input__email" className="input input__email">
                E-mail:
                <input required type="email" id="input__email" />
              </label>
              <label
                htmlFor="input__phone-number"
                className="input input__phone-number"
              >
                Phone number:
                <input required type="tel" id="input__phone-number" />
              </label>
              <label
                htmlFor="input__birth-date"
                className="input input__birth-date"
              >
                Birth date:
                <input required type="date" id="input__birth-date" />
              </label>
            </article>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {showConfirmationModal && (
        <>
          <Overlay openModal={setShowConfirmationModal} />
          <Modal
            onClose={() => setShowConfirmationModal(false)}
            className="modal"
            isVisible={showConfirmationModal}
            title="Thank you for submitting!"
            text="We will contact you as soon as possible"
          >
            <div className="modal__buttons-container">
              <Button.Root
                ariaLabel="ok"
                onClick={() => {
                  setShowConfirmationModal(false);
                  navigate("/");
                }}
              >
                <Button.Label label="Ok" />
              </Button.Root>
            </div>
          </Modal>
        </>
      )}
    </main>
  );
};

export default AdoptionForm;
