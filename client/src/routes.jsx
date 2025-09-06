import { Routes, Route } from 'react-router-dom';
import Login from './components/common/Login.jsx';
import Register from './components/common/Register.jsx';
import Profile from './components/common/Profile.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import CarList from './components/common/CarList.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<h1>Car Rental App</h1>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route path="/cars" element={<CarList />} />
  </Routes>
);

export default AppRoutes;
