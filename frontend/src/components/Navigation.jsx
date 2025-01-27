import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">EcoTrack 🌱</h1>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-200 transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50">
              Register
            </Link>
          </>
        ) : (
          <button onClick={logout} className="hover:text-green-200 transition-colors">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
