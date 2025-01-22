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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Carbon Tracking</h2>
      <button
        onClick={handleGoBack}
        className="mb-6 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
      >
        Back to Dashboard
      </button>

      <form className="space-y-4">
        {/* Home Energy */}
        <div>
          <h3 className="text-lg font-semibold">Home Energy</h3>
          <label className="block">
            Electricity Bill:
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={(e) =>
                handleInputChange("home_energy", "electricity_bill", e.target.value)
              }
            />
          </label>
          <label className="block mt-4">
            Heating Type:
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={(e) =>
                handleInputChange("home_energy", "heating_type", e.target.value)
              }
            />
          </label>
        </div>

        {/* Transportation */}
        <div>
          <h3 className="text-lg font-semibold">Transportation</h3>
          <label className="block">
            Car Type:
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={(e) => handleInputChange("transportation", "car_type", e.target.value)}
            />
          </label>
          <label className="block mt-4">
            Weekly Distance (km):
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={(e) =>
                handleInputChange("transportation", "weekly_distance_km", e.target.value)
              }
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-2 rounded-lg font-medium text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {submissionResult && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="text-xl font-bold">Your Carbon Footprint</h3>
          <p className="text-gray-800 mt-4">Carbon Footprint: {submissionResult.carbon_footprint} kg</p>
          <h4 className="text-lg font-semibold mt-6">Tips:</h4>
          <ul className="list-disc ml-6 mt-2">
            {submissionResult.critique_and_tips.split("\n").map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarbonTrackingPage;
