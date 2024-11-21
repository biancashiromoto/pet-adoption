import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
};

const Modal: FC<Props> = ({
  children,
  className,
  isVisible = true,
  onClose,
  title,
  text,
  ...rest
}) => {
  if (!isVisible) return null;

  return (
    <div className={`modal ${className}`} {...rest}>
      <section className="modal-body">
        <h2>{title}</h2>

        {text && <p>{text}</p>}
        {children}
      </section>
    </div>
  );
};

export default Modal;
