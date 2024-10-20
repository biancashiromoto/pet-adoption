import { ReactNode } from "react";

export interface ButtonRootProps {
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  disabled: boolean | false;
  onClick: (arg0: any) => void;
}