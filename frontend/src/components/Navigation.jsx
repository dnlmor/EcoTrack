import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl">EcoTrack</h1>
      <div>
        {!user ? (
          <>
            <Link to="/login" className="mx-2">
              Login
            </Link>
            <Link to="/register" className="mx-2">
              Register
            </Link>
          </>
        ) : (
          <button onClick={logout} className="mx-2">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
