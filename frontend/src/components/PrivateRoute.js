import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is not authenticated (no token or invalid token), redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
