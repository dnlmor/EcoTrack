import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {user?.username || "User"}!
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Ready to track your carbon footprint and make a difference?
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/stats-dashboard"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            View Stats & Start Tracking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
