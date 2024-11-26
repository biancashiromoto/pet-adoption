import { Context } from "@/context";
import { Utils } from "@/helpers/Utils";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const utils = new Utils();

const useShowNotice = () => {
  const location = useLocation();
  const { dontShowHomePageNoticeAgain, setShowNotice, showNotice } =
    useContext(Context);

  useEffect(() => {
    setShowNotice(!dontShowHomePageNoticeAgain);
  }, [location.pathname]);

  useEffect(() => {
    utils.setLocalStorage(
      "dont-show-again",
      dontShowHomePageNoticeAgain ? "true" : "false"
    );
  }, [dontShowHomePageNoticeAgain]);

  return { showNotice };
};

export default useShowNotice;
