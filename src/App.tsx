import "./styles/App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import AdoptionForm from "./pages/AdoptionForm";
import { Button } from "./components/Button";
import Notice from "./components/Notice";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Utils } from "./helpers/Utils";

const utils = new Utils();
const storagedDontShowAgain: boolean =
  utils.getLocalStorage("dont-show-again") === "true";

const AppContent = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <Header />
      {showNotice && (
        <Notice setShowNotice={setShowNotice}>
          <p>
            <strong>Note: </strong>
            This website is a demo created for learning and development
            purposes. The pet names and images are fetched from an external API,
            and their ages are randomly assigned. No real adoptions take place
            here.
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
      )}
      {location.pathname !== "/" && (
        <>
          <hr />
          <Button.Root
            ariaLabel="Return to previous page"
            className="button__return"
            onClick={() => navigate(-1)}
          >
            <Button.Label label="Go back" />
          </Button.Root>
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
