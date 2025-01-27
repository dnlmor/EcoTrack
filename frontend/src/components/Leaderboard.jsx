import React, { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/carbonService";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data.leaderboard); // Ensure data structure matches API response
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard. Please try again later.");
      }
    };
    loadLeaderboard();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {leaderboard.map((entry, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <span className="font-medium">{entry.user_id}</span>
            <span className="text-blue-600 font-semibold">{entry.carbon_footprint} kg</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
