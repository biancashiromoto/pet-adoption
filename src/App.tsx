import "@/styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AdoptionForm from "@/pages/AdoptionForm";
import Header from "@/components/Header";
import NoticeHomePage from "./components/NoticeHomePage";
import Footer from "./components/Footer";
import useShowNotice from "./hooks/useShowNotice";

const AppContent = () => {
  const { showNotice } = useShowNotice();

  const renderNotice = () => {
    if (!showNotice) return null;
    return <NoticeHomePage />;
  };

  return (
    <div className="app-grid">
      <Header />
      <div className="app-content">
        {renderNotice()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<AdoptionForm />} />
        </Routes>
      </div>
      <Footer />
    </div>
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
