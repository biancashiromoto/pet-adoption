import "@/styles/App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "@/pages/Home";
import AdoptionForm from "@/pages/AdoptionForm";
import { useContext, useEffect } from "react";
import Header from "@/components/Header";
import { Utils } from "@/helpers/Utils";
import { Context } from "@/context";
import NoticeHomePage from "./components/NoticeHomePage";
import Footer from "./components/Footer";

const utils = new Utils();

const AppContent = () => {
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

  const renderNotice = () => {
    if (!showNotice) return null;
    return <NoticeHomePage />;
  };

  return (
    <>
      <Header />
      <div className="app-content">
        {renderNotice()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<AdoptionForm />} />
        </Routes>
      </div>
      <Footer />
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
