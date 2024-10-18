import { Dispatch, ReactNode, SetStateAction } from "react";

export interface NoticeProps {
  children: ReactNode;
  setShowNotice: Dispatch<SetStateAction<boolean>>;
}