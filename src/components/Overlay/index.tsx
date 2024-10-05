import { Dispatch, SetStateAction } from "react"

interface OverlayProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Overlay = ({ setShowModal }: OverlayProps) => {
  return (
    <div
      aria-label="Close modal"
      className="overlay"
      role="button"
      onClick={() => setShowModal(false)}
    />
  )
}

export default Overlay