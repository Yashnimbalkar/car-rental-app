import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Car Rental App</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;