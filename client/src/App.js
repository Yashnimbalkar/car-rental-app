import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx'; 
import './assets/styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;