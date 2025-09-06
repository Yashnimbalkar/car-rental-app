import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null; // Handled by ProtectedRoute

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">Role: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;