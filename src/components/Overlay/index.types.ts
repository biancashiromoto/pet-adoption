import { Dispatch, SetStateAction } from "react";

export interface OverlayProps {
  openModal: Dispatch<SetStateAction<boolean>>;
}
