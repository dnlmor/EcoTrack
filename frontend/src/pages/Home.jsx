import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-green-800 mb-8">
          Track Your Carbon Footprint 🌱
        </h1>
        <p className="text-xl text-green-700 mb-12">
          Join thousands of earth-conscious individuals making a difference, 
          one green choice at a time 🌍
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <span className="text-4xl mb-4">📊</span>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Track Impact</h3>
            <p className="text-green-600">Monitor your daily carbon footprint</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <span className="text-4xl mb-4">🎮</span>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Fun Games</h3>
            <p className="text-green-600">Learn while playing eco-friendly games</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <span className="text-4xl mb-4">🏆</span>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Compete</h3>
            <p className="text-green-600">Join leaderboards and win eco-badges</p>
          </div>
        </div>

        <Link
          to="/register"
          className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg text-lg"
        >
          Join The Green Movement 🌿
        </Link>
      </div>
    </div>
  </div>
);

export default Home;