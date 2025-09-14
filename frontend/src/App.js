// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import Home from './pages/Home';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
// import CarList from './components/cars/CarList';
// import UserDashboard from './pages/UserDashboard';
// import AdminPanel from './components/dashboard/AdminPanel';
// import ProtectedRoute from './components/common/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Navbar />
//         <main className="py-3">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/cars" element={<CarList />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <UserDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <AdminPanel />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CarList from './components/cars/CarList';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './components/dashboard/AdminPanel';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main className="py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cars" element={<CarList />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;