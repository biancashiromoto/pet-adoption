import { useContext } from "react";
import Notice from "../Notice";
import { Context } from "@/context";
import { TiWarningOutline } from "react-icons/ti";
import { IoOpenOutline } from "react-icons/io5";

const NoticeHomePage = () => {
  const { dontShowHomePageNoticeAgain, setDontShowHomePageNoticeAgain } =
    useContext(Context);
  return (
    <Notice className="notice__home-page">
      <p>
        <TiWarningOutline />
        This website is a demo created for learning and development purposes. No
        real adoptions take place here. For more details, see the{" "}
        <a
          rel="noopener"
          target="_blank"
          href="https://github.com/biancashiromoto/pet-adoption/blob/main/README.md"
        >
          README <IoOpenOutline aria-label="Opens in a new tab" />
        </a>
        file.
      </p>
      <label htmlFor="dont-show-again" className="show-notice-again">
        <input
          id="dont-show-again"
          type="checkbox"
          checked={dontShowHomePageNoticeAgain}
          onChange={() =>
            setDontShowHomePageNoticeAgain((prevState: boolean) => !prevState)
          }
        />
        Don't show again
      </label>
    </Notice>
  );
};

export default NoticeHomePage;
