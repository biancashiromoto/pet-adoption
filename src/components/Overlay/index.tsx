import { OverlayProps } from "./index.types"

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