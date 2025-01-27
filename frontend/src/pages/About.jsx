// pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-8">About EcoTrack 🌱</h1>
        
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">How It Works 🔍</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <span className="text-4xl mb-4 block">📊</span>
              <h3 className="font-semibold text-green-800 mb-2">Track</h3>
              <p className="text-green-600">Log your daily activities and energy usage</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <span className="text-4xl mb-4 block">💡</span>
              <h3 className="font-semibold text-green-800 mb-2">Learn</h3>
              <p className="text-green-600">Get personalized eco-friendly recommendations</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <span className="text-4xl mb-4 block">🏆</span>
              <h3 className="font-semibold text-green-800 mb-2">Improve</h3>
              <p className="text-green-600">Compete and earn eco-achievements</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Why Track Carbon Footprint? 🌍</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <p className="text-green-700">Understand your environmental impact</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <p className="text-green-700">Make informed eco-friendly choices</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <p className="text-green-700">Contribute to global sustainability goals</p>
            </li>
          </ul>
        </section>

        <div className="text-center">
          <Link 
            to="/register" 
            className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Start Your Green Journey 🌱
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;