import { Dispatch, SetStateAction } from "react"

interface OverlayProps {
  openModal: Dispatch<SetStateAction<boolean>>;
}

const Overlay = ({ openModal }: OverlayProps) => {
  return (
    <div
      aria-label="Close modal"
      className="overlay"
      role="button"
      onClick={() => openModal(false)}
    />
  )
}

export default Overlay