// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AppRoutes from './routes';
// import './assets/styles/main.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<h1>Car Rental App project </h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// // username:rajupanit27 pass: Raju123 

// // mongodb+srv://rajupanit27:Raju123@carrentalcluster.xjean8i.mongodb.net/?retryWrites=true&w=majority&appName=CarRentalCluster

// export default App; 


import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
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