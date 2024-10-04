import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdoptionForm from './pages/AdoptionForm';

function App() {
  return (
    <>
      <h1>Pet adoption</h1>
      <p>
        <strong>Attention: </strong>
        This is a fake adoption site created to practice my development skills. None of these pets can be adopted through this page.
      </p>
      <hr />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<AdoptionForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
