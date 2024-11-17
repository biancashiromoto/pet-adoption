import "@/styles/App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Home from "@/pages/Home";
import AdoptionForm from "@/pages/AdoptionForm";
import Notice from "@/components/Notice";
import { useContext, useEffect } from "react";
import Header from "@/components/Header";
import { Utils } from "@/helpers/Utils";
import { PiKeyReturnThin } from "react-icons/pi";
import { Context } from "@/context";

const utils = new Utils();

const AppContent = () => {
  const location = useLocation();
  const {
    dontShowNoticeAgain,
    setShowNotice,
    showNotice,
    setDontShowNoticeAgain,
  } = useContext(Context);

  useEffect(() => {
    setShowNotice(!dontShowNoticeAgain);
  }, [location.pathname]);

  useEffect(() => {
    utils.setLocalStorage(
      "dont-show-again",
      dontShowNoticeAgain ? "true" : "false"
    );
  }, [dontShowNoticeAgain]);

  const renderNotice = () => {
    if (!showNotice) return null;
    return (
      <Notice setShowNotice={setShowNotice}>
        <p>
          <strong>Note: </strong>
          This website is a demo created for learning and development purposes.
          The pet names and images are fetched from an external API, and their
          ages are randomly assigned. No real adoptions take place here.
          <br />
          For more details, see the{" "}
          <a href="https://github.com/biancashiromoto/pet-adoption/blob/main/README.md">
            README
          </a>{" "}
          file.
        </p>
        <label htmlFor="dont-show-again" className="show-notice-again">
          <input
            id="dont-show-again"
            type="checkbox"
            checked={dontShowNoticeAgain}
            onChange={() => setDontShowNoticeAgain((prevState) => !prevState)}
          />
          Don't show again
        </label>
      </Notice>
    );
  };

  return (
    <>
      <Header />
      <div className="app-content">
        {renderNotice()}
        {location.pathname !== "/" && (
          <>
            <Link
              className="link link__return"
              to="/"
              aria-label="Return to Home page"
            >
              <PiKeyReturnThin />
            </Link>
          </>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<AdoptionForm />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
