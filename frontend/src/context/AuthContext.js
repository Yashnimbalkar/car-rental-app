import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { login as loginService, signup as signupService, logout as logoutService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data (we'll use /api/users/profile)
      api.get('/users/profile')
        .then(response => {
          setUser(response.data.data);
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

  // Login
  const login = async (credentials) => {
    try {
      const response = await loginService(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  // Signup
  const signup = async (userData) => {
    try {
      const response = await signupService(userData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  };

  // Logout
  const logout = () => {
    logoutService();
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};