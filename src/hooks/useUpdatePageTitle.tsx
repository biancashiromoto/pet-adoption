import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useUpdatePageTitle = (newTitle: string) => {
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = newTitle;

    return () => {
      document.title = previousTitle;
    };
  }, [location.pathname, newTitle]);
};

export default useUpdatePageTitle;
