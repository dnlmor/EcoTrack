import React, { useState } from "react";
import { submitCarbonData } from "../services/carbonService";
import { useNavigate } from "react-router-dom";

const CarbonTrackingPage = () => {
  const [userInput, setUserInput] = useState({
    home_energy: {},
    transportation: {},
    diet: {},
    waste: {},
  });
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (category, question, value) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      [category]: {
        ...prevInput[category],
        [question]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitCarbonData(userInput);
      setSubmissionResult(response);
    } catch (error) {
      console.error("Error submitting carbon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/stats-dashboard");
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Track Your Carbon Impact 🌍</h2>
        
        <button
          onClick={handleGoBack}
          className="mb-8 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          ← Back to Dashboard
        </button>
  
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="grid md:grid-cols-2 gap-8">
            {/* Home Energy Section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">🏠 Home Energy</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-green-700 mb-2">Monthly Electricity Bill ($)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onChange={(e) => handleInputChange("home_energy", "electricity_bill", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-green-700 mb-2">Heating Type</label>
                  <select
                    className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onChange={(e) => handleInputChange("home_energy", "heating_type", e.target.value)}
                  >
                    <option value="">Select heating type</option>
                    <option value="gas">Natural Gas</option>
                    <option value="electric">Electric</option>
                    <option value="oil">Oil</option>
                    <option value="renewable">Renewable</option>
                  </select>
                </div>
              </div>
            </div>
  
            {/* Transportation Section */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">🚗 Transportation</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-green-700 mb-2">Vehicle Type</label>
                  <select
                    className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onChange={(e) => handleInputChange("transportation", "car_type", e.target.value)}
                  >
                    <option value="">Select vehicle type</option>
                    <option value="electric">Electric Vehicle</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="gasoline">Gasoline</option>
                    <option value="diesel">Diesel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-green-700 mb-2">Weekly Distance (km)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onChange={(e) => handleInputChange("transportation", "weekly_distance_km", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
  
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-8 py-3 rounded-lg font-semibold text-white transition-colors ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Calculating..." : "Calculate My Carbon Footprint 🌱"}
          </button>
        </div>
  
        {submissionResult && (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Your Carbon Footprint Results 📊</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-xl font-semibold text-green-700">
                Annual Carbon Footprint: {submissionResult.carbon_footprint} kg CO₂
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-3">Eco-friendly Tips 💡</h4>
              <ul className="space-y-2">
                {submissionResult.critique_and_tips.split("\n").map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-green-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonTrackingPage;
