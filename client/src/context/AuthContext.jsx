import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  // Register function
  const register = async (name, email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};