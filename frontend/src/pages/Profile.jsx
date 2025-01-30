// pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Loader from '../components/Loader'; // Import Loader component
import Alert from '../components/Alert'; // Import Alert component
import { getCurrentUser } from '../services/authService';

const Profile = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const stats = await getCurrentUser(user.token); // Fetch user data
        setUserStats(stats);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUserStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 p-6">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card variant="bordered" className="p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">{user?.username}</h2>
              <p className="text-green-600 mb-4">{userStats?.rank || "No Rank"}</p>
              <div className="flex justify-center space-x-2">
                <Badge label={`Level ${userStats?.level || "N/A"}`} type="success" />
                <Badge label={userStats?.isActive ? "Active" : "Inactive"} type="info" />
              </div>
            </div>
          </Card>

          {/* Stats Summary */}
          <Card variant="bordered" className="p-8 md:col-span-2">
            <h3 className="text-xl font-semibold text-green-800 mb-6">Carbon Impact</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-700">{userStats?.totalFootprint || "0"}</p>
                <p className="text-green-600">kg CO₂ Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-700">{userStats?.savedEmissions || "0"}</p>
                <p className="text-green-600">kg CO₂ Saved</p>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card variant="bordered" className="p-8 md:col-span-2">
            <h3 className="text-xl font-semibold text-green-800 mb-6">Achievements 🏆</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userStats?.achievements?.map(achievement => (
                <div 
                  key={achievement.id}
                  className="flex items-center p-4 bg-green-50 rounded-lg"
                >
                  <span className="text-2xl mr-4">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold text-green-800">{achievement.name}</h4>
                    <p className="text-sm text-green-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Progress */}
          <Card variant="bordered" className="p-8">
            <h3 className="text-xl font-semibold text-green-800 mb-6">Monthly Progress 📈</h3>
            <div className="space-y-4">
              {userStats?.monthlyProgress?.map((month, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-green-700">{month.month}</span>
                  <span className="font-semibold text-green-800">{month.footprint} kg</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
