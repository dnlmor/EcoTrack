import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Welcome, {user?.username || "User"} 🌿
        </h1>
        <p className="text-xl text-green-700 mb-12">
          Ready to reduce your carbon footprint and make Earth happier? 🌍
        </p>
        <div className="space-y-6">
          <Link
            to="/stats-dashboard"
            className="block max-w-md mx-auto px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
          >
            Start Tracking Your Impact 📊
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
