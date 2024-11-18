import { useContext } from "react";
import Notice from "../Notice";
import { Context } from "@/context";
import { TiWarningOutline } from "react-icons/ti";

const NoticeHomePage = () => {
  const { dontShowHomePageNoticeAgain, setDontShowHomePageNoticeAgain } =
    useContext(Context);
  return (
    <Notice>
      <p>
        <TiWarningOutline />
        This website is a demo created for learning and development purposes. No
        real adoptions take place here. For more details, see the{" "}
        <a href="https://github.com/biancashiromoto/pet-adoption/blob/main/README.md">
          README
        </a>{" "}
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
