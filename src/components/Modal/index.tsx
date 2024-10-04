import { Dispatch, SetStateAction } from "react";
import { Pet } from "../../pages/Home";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    pet: Pet[];
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ pet, setShowModal }: ModalProps) => {
const navigate = useNavigate();

  return (
    <div className='modal'>
        <h2>{`Are you sure you want to adopt ${pet[0].name}?`}</h2>
        <img alt="Random picture of a cat" src={pet[0].url} />
        <div className="modal__buttons-container">
            <button
                aria-label="Yes"
                type="button"
                onClick={() => navigate("/adopt")}
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