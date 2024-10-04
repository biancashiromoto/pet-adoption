import './App.scss';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AdoptionForm from './pages/AdoptionForm';
import { Button } from './components/Button';

const AppContent = () => {
  const navigate  = useNavigate();
  const location = useLocation()
  
  return (
    <>
      <h1>Pet adoption</h1>
      <p>
        <strong>Attention: </strong>
        This is a fake adoption site created to practice my development skills. The pets' names and pictures were retrieved from an API, and their ages are randomly generated.
      </p>
      {location.pathname !== '/' && (
        <Button.Root
          ariaLabel='Go back'
          onClick={() => navigate(-1)}
        >
          <Button.Label label='Go back' />  
        </Button.Root>
      )}
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<AdoptionForm />} />
      </Routes>
    </> 
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
