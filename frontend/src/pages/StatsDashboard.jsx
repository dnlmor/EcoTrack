import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCarbonResults } from "../services/carbonService";
import Card from "../components/Card";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { Line } from "react-chartjs-2"; // Import Chart.js Line component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler); // Register Filler plugin

const StatsDashboard = () => {
  const [tracking, setTracking] = useState([]);
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
        const data = await getCarbonResults(user.token);
        setTracking(data.results || []); // Correctly set tracking data from response
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Prepare the chart data
  const chartData = {
    labels: tracking.map((entry) => new Date(entry.timestamp).toLocaleDateString()), // X-axis: formatted timestamp
    datasets: [
      {
        label: "Carbon Footprint (kg CO₂)",
        data: tracking.map((entry) => entry.total), // Y-axis: total carbon footprint
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, // This requires the Filler plugin
        tension: 0.4, // Makes the line smoother
      },
    ],
  };

  // Calculate average, best, and worst values
  const calculateStats = (data) => {
    const validData = data.filter(entry => entry.total > 0); // Filter out 0 values
    const average = validData.reduce((sum, entry) => sum + entry.total, 0) / validData.length || 0;
    const best = Math.min(...validData.filter(entry => entry.total > 1000).map(entry => entry.total));
    const worst = Math.max(...validData.map(entry => entry.total));
    return { average, best, worst };
  };

  const { average, best, worst } = calculateStats(tracking);

  if (loading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">Track List</h2>
          <Button onClick={() => navigate("/carbon-tracking")} variant="primary" size="lg">
            Track Carbon Footprint 📊
          </Button>
        </div>

        {/* Flex container for the Track List and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Track List */}
          <Card variant="bordered" className="mb-8">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Your Track List 🏆</h3>
            {tracking.length > 0 ? tracking.map((entry, index) => (
              <div key={entry.id} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <span className="text-green-700 font-medium">{entry.username}</span>
                  <div className="text-green-500 text-sm">{new Date(entry.timestamp).toLocaleString()}</div>
                </div>
                <span className="text-green-800 font-bold">{entry.total} kg CO₂</span>
              </div>
            )) : <p className="text-green-600">No track data available.</p>}
          </Card>

          {/* Chart Section */}
          {tracking.length > 0 && (
            <Card variant="bordered">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Carbon Footprint Progression 📈</h3>
              <Line data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: "Carbon Footprint Over Time" } } }} />
              <div className="mt-4">
                <p className="text-green-700 font-medium">Average: {average.toFixed(2)} kg CO₂</p>
                <p className="text-green-700 font-medium">Best: {best ? best.toFixed(2) : "N/A"} kg CO₂</p>
                <p className="text-green-700 font-medium">Worst: {worst.toFixed(2)} kg CO₂</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
