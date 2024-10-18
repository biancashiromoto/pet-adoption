import { ModalProps } from './index.types'

const Modal = ({
  children,
  className,
  title,
  text,
  ...rest
}: ModalProps) => {
  return (
    <div className='modal' {...rest}>
      <h2>{ title }</h2>
      <p>{ text }</p>
      { children }
    </div>
  )
}

export default Modal