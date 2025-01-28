// components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();
  
  if (!user || !user.token) {
    // Redirect to login if there's no user or token
    return <Navigate to="/login" />;
  }

  // If authenticated, render child route
  return <Outlet />;
};

export default PrivateRoute;