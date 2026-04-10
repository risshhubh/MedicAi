import React, { createContext, useState, useEffect, useContext } from 'react';
import { googleLogin as googleLoginApi } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('currentUser');
    if (auth === 'true' && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Signup failed' };
      }

      // Auto login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(data));
      setIsAuthenticated(true);
      setCurrentUser(data);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error connecting to backend' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(data));
      setIsAuthenticated(true);
      setCurrentUser(data);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Network error connecting to backend' };
    }
  };

  const googleLogin = async (token) => {
    try {
      const data = await googleLoginApi(token);
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(data));
      setIsAuthenticated(true);
      setCurrentUser(data);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Google login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, signup, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
