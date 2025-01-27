// pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";

const Dashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      title: "Track Carbon Footprint",
      description: "Monitor your daily environmental impact",
      icon: "📊",
      link: "/carbon-tracking"
    },
    {
      title: "View Statistics",
      description: "Check your progress and rankings",
      icon: "📈",
      link: "/stats-dashboard"
    },
    {
      title: "Eco Tips",
      description: "Get personalized recommendations",
      icon: "💡",
      link: "/tips"
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          Welcome, {user?.username || "Friend"} 🌱
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="bordered">
              <div className="text-center p-6">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {feature.title}
                </h2>
                <p className="text-green-600 mb-6">{feature.description}</p>
                <Link to={feature.link}>
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;