import { Button } from "../Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { NoticeProps } from "./index.types";

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