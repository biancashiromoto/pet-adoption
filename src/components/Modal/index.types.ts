import { ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  text?: string;
};
