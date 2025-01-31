import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { getUserProfile } from "../services/authService";

const Dashboard = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data
  useEffect(() => {
    if (!user?.token) return;

    const fetchProfile = async () => {
      try {
        console.log("Fetching profile with token:", user.token);
        const data = await getUserProfile(user.token);
        setUserStats(data);
      } catch (err) {
        setError(`Error fetching profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.token]);

  // Loading Skeleton
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="bg-gray-300 rounded-full w-32 h-32 mx-auto"></div>
          <div className="bg-gray-300 h-6 w-2/3 mx-auto mt-4"></div>
          <div className="bg-gray-300 h-4 w-1/2 mx-auto mt-2"></div>
          <div className="bg-gray-300 h-4 w-1/3 mx-auto mt-2"></div>
        </div>
      </div>
    );

  // Error Handling
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 font-semibold text-lg">{`Error: ${error}`}</div>
      </div>
    );

  // Default fallback for username
  const username = userStats?.username || "Friend";

  const features = [
    {
      title: "Check Your Carbon Emission",
      description: "Monitor your daily environmental impact",
      icon: "📊",
      link: "/carbon-tracking"
    },
    {
      title: "View Your Emission Track",
      description: "Check the stats and logs of your carbon emission tracks",
      icon: "📈",
      link: "/stats-dashboard"
    },
    {
      title: "Play EcoGame",
      description: "Test your knowledge in sustainability and compete against other users",
      icon: "🎮",
      link: "/tips"
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          Welcome, {username} 🌱
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
