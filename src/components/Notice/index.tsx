import { IoMdCloseCircleOutline } from "react-icons/io";
import React, { useState } from "react";

interface GenericNoticeProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  type?: "success" | "error" | "info" | "warning";
}

const Notice: React.FC<GenericNoticeProps> = ({
  children,
  onClose,
  showCloseButton = true,
  icon = <IoMdCloseCircleOutline />,
  type = "info",
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    if (onClose) onClose();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      className={`notice notice--${type} ${className}`}
      data-testid="notice"
      {...props}
    >
      <div className="notice__content">{children}</div>
      {showCloseButton && (
        <button
          onClick={handleClose}
          aria-label="Close notice"
          type="button"
          className="notice__close-button"
        >
          {icon}
        </button>
      )}
    </section>
  );
};

export default Notice;
