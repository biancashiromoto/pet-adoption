import { ReactNode } from "react";

export interface ButtonRootProps {
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick: (arg0: any) => void;
}