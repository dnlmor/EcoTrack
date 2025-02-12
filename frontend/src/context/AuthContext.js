// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { logout as logoutService } from "../services/authService";

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
      console.error("Logout error:", error?.message || JSON.stringify(error));
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);