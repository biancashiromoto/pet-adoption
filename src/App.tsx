import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <>
      <h1>Pet adoption</h1>
      <p>
        <strong>Attention: </strong>
        This is a fake adoption site created to practice my development skills. None of these pets can be adopted through this page.
      </p>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
