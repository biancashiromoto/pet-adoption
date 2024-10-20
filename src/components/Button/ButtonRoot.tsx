import { ButtonRootProps } from "./index.types";

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