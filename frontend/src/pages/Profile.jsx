import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { getUserProfile } from "../services/authService";

const Profile = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Error handling
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 font-semibold text-lg">{`Error: ${error}`}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Grid layout with responsive columns */}
          {/* Profile Card */}
          <Card variant="bordered" className="p-8 shadow-lg rounded-lg transform transition-transform hover:scale-105">
            <div className="text-center">
              <img
                src={userStats.avatar_url || '/default-avatar.png'}
                alt="Profile Avatar"
                className="mx-auto rounded-full w-32 h-32 object-cover mb-4 shadow-md border-4 border-green-400 hover:border-green-600 transition-all duration-200"
              />
              <h2 className="text-3xl font-semibold text-green-800 mb-2">{userStats.username || "N/A"}</h2>
              <p className="text-green-600 mb-4">{userStats.rank || "Unranked"}</p>
              <p className="text-gray-600 text-sm italic">{userStats.bio || "No bio available."}</p>
              <Badge label={`Level ${userStats.level || 1}`} type="success" className="mt-4" />
            </div>
          </Card>

          {/* Additional Information Section */}
          <div className="col-span-1 md:col-span-2 bg-white p-8 shadow-lg rounded-lg">
            <h3 className="text-2xl text-green-800 mb-6">Additional Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Full Name:</span>
                <span className="text-green-700">{userStats.full_name || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-green-700">{userStats.email || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Phone Number:</span>
                <span className="text-green-700">{userStats.phone_number || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email Verified:</span>
                <span className={`text-${userStats.email_verified ? 'green' : 'red'}-700`}>
                  {userStats.email_verified ? "Verified" : "Not Verified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className={`text-${userStats.is_active ? 'green' : 'red'}-700`}>
                  {userStats.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
