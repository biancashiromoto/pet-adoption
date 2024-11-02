import "./styles/App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import AdoptionForm from "./pages/AdoptionForm";
import Notice from "./components/Notice";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Utils } from "./helpers/Utils";
import { PiKeyReturnThin } from "react-icons/pi";

const utils = new Utils();
const storagedDontShowAgain: boolean =
  utils.getLocalStorage("dont-show-again") === "true";

const AppContent = () => {
  const location = useLocation();
  const [showNotice, setShowNotice] = useState<boolean>(!storagedDontShowAgain);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(
    storagedDontShowAgain
  );

  useEffect(() => {
    setShowNotice(!dontShowAgain);
  }, [location.pathname]);

  useEffect(() => {
    utils.setLocalStorage("dont-show-again", dontShowAgain ? "true" : "false");
  }, [dontShowAgain]);

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
            checked={dontShowAgain}
            onChange={() => setDontShowAgain((prevState) => !prevState)}
          />
          Don't show again
        </label>
      </Notice>
    );
  };

  return (
    <>
      <Header />
      {renderNotice()}
      {location.pathname !== "/" && (
        <>
          <hr />
          <Link className="link" to="/" aria-label="Return to Home page">
            <PiKeyReturnThin />
          </Link>
        </>
      )}
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<AdoptionForm />} />
      </Routes>
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
