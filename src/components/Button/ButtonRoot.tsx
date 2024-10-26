import { ButtonRootProps } from "./index.types";

const ButtonRoot = ({
  ariaLabel,
  children,
  className = "",
  disabled = false,
  onClick,
  ...rest
}: ButtonRootProps) => {
  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      role="button"
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonRoot;
