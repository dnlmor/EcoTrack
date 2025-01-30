import React, { createContext, useState, useContext, useEffect } from "react";
import { logout as logoutService, getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Update localStorage when user state changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      token: userData.access_token
    });
  };

  const logout = async () => {
    try {
      if (user?.token) {
        await logoutService(user.token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const fetchCurrentUser = async () => {
    if (user?.token) {
      try {
        const currentUserData = await getCurrentUser(user.token);
        setUser(prevState => ({
          ...prevState,
          ...currentUserData // Merge with existing user data
        }));
      } catch (error) {
        console.error('Fetch current user error:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
