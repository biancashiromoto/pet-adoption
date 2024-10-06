import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "../Button";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface NoticeProps {
  children: ReactNode;
  setShowNotice: Dispatch<SetStateAction<boolean>>;
}

const Notice = ({ children, setShowNotice }: NoticeProps) => {
  return (
    <section className='notice'>
      <Button.Root
        onClick={() => setShowNotice(false)}
        ariaLabel="Close notice"
      >
        <IoMdCloseCircleOutline />
      </Button.Root>
      { children }
    </section>
  )
}

export default Notice