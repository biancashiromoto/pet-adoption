import './App.scss';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AdoptionForm from './pages/AdoptionForm';
import { Button } from './components/Button';

const AppContent = () => {
  const navigate  = useNavigate();
  const location = useLocation();
  
  return (
    <>
      <h1>Pet adoption</h1>
      <section className='notice'>
        <p>
          <strong>Note: </strong>
          This website is a demo created for learning and development purposes. The pet names and images are fetched from an external API, and their ages are randomly assigned. No real adoptions take place here.
          <br />
          For more details, see the <a href='https://github.com/biancashiromoto/pet-adoption/blob/main/README.md'>README</a> file.
        </p>
      </section>
      <hr />
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
