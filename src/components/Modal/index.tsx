import { ReactNode } from 'react'

interface Modal2Props {
  children: ReactNode;
  className?: string;
  title?: string;
  text?: string;
}

const Modal = ({
  children,
  className,
  title,
  text,
  ...rest
}: Modal2Props) => {
  return (
    <div className='modal' {...rest}>
      <h2>{ title }</h2>
      <p>{ text }</p>
      { children }
    </div>
  )
}

export default Modal