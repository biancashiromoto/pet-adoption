import { ReactNode } from "react";

interface ButtonRootProps {
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  disabled: boolean | false;
  onClick: (arg0: any) => void;
}

const ButtonRoot = ({
  ariaLabel,
  children,
  className = '',
  onClick,
  ...rest
}: ButtonRootProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      role="button"
      type="button"
      {...rest}
    >
      { children }
    </button>
  )
}

export default ButtonRoot