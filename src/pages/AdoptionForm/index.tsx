import { useState } from "react";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import Overlay from "../../components/Overlay";

const AdoptionForm = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <form
                className="form"
                onSubmit={() => {}}
            >
                <label htmlFor="input__first-name">
                    First name: 
                    <input type="text" id="input__first-name" />
                </label>
                <label htmlFor="input__last-name">
                    Last name: 
                    <input type="text" id="input__last-name" />
                </label>
                <label htmlFor="input__email">
                    Email: 
                    <input type="email" id="input__email" />
                </label>
                <label htmlFor="input__phone-number">
                    Phone-number: 
                    <input type="tel" id="input__phone-number" />
                </label>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('submit');
                        setShowModal(true);
                    }}
                    type="submit"
                >
                    Submit
                </button>
            </form>
            {showModal && (
                <>
                    <Overlay setShowModal={setShowModal }/>
                    <Modal
                        title="Thank you for submitting!"
                        text="We will contact you as soon as possible"
                    >
                        <div className="modal__buttons-container">
                            <Button.Root
                                ariaLabel="ok"
                                onClick={() => setShowModal(false)}
                            >
                            <Button.Label label="Ok" />
                            </Button.Root>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}

export default AdoptionForm