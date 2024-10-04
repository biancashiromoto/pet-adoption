import { Dispatch, SetStateAction } from "react";
import { Pet } from "../../pages/Home";

interface ModalProps {
    pet: Pet[];
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ pet, setShowModal }: ModalProps) => {
  return (
    <div className='modal'>
        <h2>{`Are you sure you want to adopt ${pet[0].name}?`}</h2>
        <div className="modal__buttons-container">
            <button
                aria-label="Yes"
                type="button"
                onClick={() => console.log('Yes')}
            >
                Yes
            </button>
            <button
                aria-label="No"
                type="button"
                onClick={() => setShowModal(false)}
            >
                No
            </button>
        </div>
    </div>
  )
}

export default Modal