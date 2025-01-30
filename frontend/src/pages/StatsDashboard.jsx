import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchCarbonFootprintResults, getCarbonQuestions } from "../services/carbonService"; // Axios-based service
import Card from "../components/Card";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const StatsDashboard = () => {
  const [tracklist, setTracklist] = useState([]); // Renamed leaderboard to tracklist
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user?.token) {
        setError("Authentication required");
        return;
      }

      try {
        setLoading(true);
        // Fetch the tracklist (carbon footprint results) and questions from the carbonService
        const [tracklistData, questionsData] = await Promise.all([
          fetchCarbonFootprintResults(user.token),
          getCarbonQuestions(user.token),
        ]);

        // Assuming the backend response for carbon footprint results is in `results` array
        setTracklist(tracklistData.results || []); // Ensure it's in the right format
        // Assuming the questions response is in `questions`
        setQuestions(questionsData.questions || {}); // Ensure it's correctly formatted
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">Statistics Dashboard</h2>
          <Button 
            onClick={() => navigate("/carbon-tracking")} 
            variant="primary" 
            size="lg"
          >
            Track Carbon Footprint 📊
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Assessment Guide */}
          <Card variant="bordered">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Assessment Guide</h3>
            {questions && Object.entries(questions).map(([category, categoryQuestions]) => (
              <div key={category} className="mb-4">
                <h4 className="text-lg font-bold capitalize text-green-700 mb-2">{category}</h4>
                <ul className="space-y-2">
                  {categoryQuestions.map((question, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-green-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>

          {/* Tracklist */}
          <Card variant="bordered">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Tracklist 🏆</h3>
            <div className="space-y-3">
              {tracklist.length > 0 ? (
                tracklist.map((entry, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-4 bg-green-50 rounded-lg"
                  >
                    <span className="text-green-700 font-medium">{entry.username}</span> {/* Displaying username */}
                    <span className="text-green-800 font-bold">{entry.total} kg</span> {/* Using 'total' for carbon footprint */}
                  </div>
                ))
              ) : (
                <p className="text-green-700">No tracklist data available.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
