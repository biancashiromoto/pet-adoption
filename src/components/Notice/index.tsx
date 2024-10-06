import { ReactNode } from "react";

interface NoticeProps {
  children: ReactNode;
}

const Notice = ({ children }: NoticeProps) => {
  return (
    <section className='notice'>
      { children }
    </section>
  )
}

export default Notice