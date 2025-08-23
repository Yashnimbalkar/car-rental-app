import { Routes, Route } from 'react-router-dom';
import Login from './components/common/Login.jsx';
import Register from './components/common/Register.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<h1>Car Rental App</h1>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AppRoutes;