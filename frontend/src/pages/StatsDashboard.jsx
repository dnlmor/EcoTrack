import React, { useEffect, useState } from "react";
import { fetchLeaderboard, fetchCarbonQuestions } from "../services/carbonService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StatsDashboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user?.token) {
        setError("You must be logged in to view this data.");
        return;
      }

      try {
        setLoading(true);
        const [leaderboardData, questionsData] = await Promise.all([
          fetchLeaderboard(user.token),
          fetchCarbonQuestions(user.token),
        ]);
        setLeaderboard(leaderboardData.leaderboard);
        setQuestions(questionsData.questions);
      } catch (err) {
        console.error("Error loading stats data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const startTracking = () => {
    navigate("/carbon-tracking");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Stats Dashboard</h2>
      <button
        onClick={startTracking}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
      >
        Start Tracking Carbon Footprint
      </button>

      <div className="mb-8">
        <h3 className="text-xl font-semibold">Carbon Footprint Assessment Questions</h3>
        {questions ? (
          Object.keys(questions).map((category, index) => (
            <div key={index} className="mt-4">
              <h4 className="text-lg font-bold capitalize">{category}</h4>
              <ul className="ml-4 list-disc">
                {questions[category].map((question, qIndex) => (
                  <li key={qIndex} className="text-gray-700">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold">Leaderboard</h3>
        <ul className="space-y-2">
          {leaderboard.map((entry, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 rounded-lg flex justify-between"
            >
              <span className="font-medium">{entry.user_id}</span>
              <span className="text-blue-600 font-semibold">
                {entry.carbon_footprint} kg
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatsDashboard;
