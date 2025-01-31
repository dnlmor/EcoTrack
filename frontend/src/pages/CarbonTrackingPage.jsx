import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCarbonQuestions, submitCarbonData } from "../services/carbonService";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const CarbonTrackingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Hook to navigate to another page
  const [questions, setQuestions] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getCarbonQuestions(user.token);
        const fetchedQuestions = data.questions ? Object.values(data.questions) : [];
        setQuestions(fetchedQuestions);
        setUserInput(initializeInput(fetchedQuestions));  // Dynamically set initial input based on questions
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [user.token]);

  // Initialize input state based on the structure of the questions
  const initializeInput = (categories) => {
    const input = {};
    categories.forEach((category) => {
      category.questions.forEach((question) => {
        input[question.id] = question.type === "number" ? "" : "None";  // Initialize input values based on question type
      });
    });
    return input;
  };

  const handleInputChange = (questionId, value) => {
    setUserInput(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      const formattedData = formatSubmitData(userInput);
      const data = await submitCarbonData(user.token, formattedData);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Format the user input for submission based on the backend's required structure
  const formatSubmitData = (input) => {
    const formattedData = {
      home_energy: {
        electricity_bill: input["electricity_bill"],
        heating_type: input["heating_type"],
        heating_usage: input["heating_usage"],
      },
      transportation: {
        car_type: input["car_type"],
        weekly_distance: input["weekly_distance"],
        flights: {
          short_haul: input["flights_short"],
          medium_haul: input["flights_medium"],
          long_haul: input["flights_long"],
        },
      },
      diet: {
        meat_days: input["meat_days"],
        dairy_consumption: input["dairy_consumption"],
        local_food_percentage: input["local_food"],
      },
      waste: {
        waste_bags: input["waste_bags"],
        recycling_percentage: input["recycling"],
        composting: input["composting"],
      },
    };
    return formattedData;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-800">Carbon Footprint Tracker</h2>
          <Link to="/dashboard" className="text-green-600 hover:text-green-700 flex items-center gap-2 text-sm">← Back to Dashboard</Link>
        </div>

        {error && <Alert type="error" message={error} className="mb-6" />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questions.length > 0 ? (
            questions.map((category) => (
              <Card key={category.title} variant="bordered" className="p-6">
                <h3 className="text-xl text-green-700 mb-4">{category.title}</h3>
                <p className="mb-6 text-sm text-green-600">{category.description}</p>
                <div className="space-y-6">
                  {category.questions && category.questions.map((question) => {
                    const value = userInput[question.id];
                    return (
                      <div key={question.id}>
                        {question.type === "number" ? (
                          <Input
                            label={question.question}
                            type="number"
                            value={value}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            placeholder={`Enter ${question.question.toLowerCase()} in ${question.unit}`}
                            className="text-sm"
                          />
                        ) : (
                          <Select
                            label={question.question}
                            options={question.options?.map(option => ({ value: option, label: option }))}
                            value={value}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            className="text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          ) : (
            <p>No questions available</p>  // Gracefully handle empty state
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleSubmit} variant="primary" size="lg" className="px-8 py-3 text-lg" disabled={submitting}>
            {submitting ? <Loader size="sm" /> : "Calculate Footprint 🌱"}
          </Button>
        </div>

        {result && (
          <Card variant="bordered" className="mt-8 p-6">
            <h3 className="text-xl font-bold text-green-800 mb-6">Results 📊</h3>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-lg font-semibold text-green-700">Your Carbon Footprint: {result.emissions.total} kg CO₂e</p>
              <div className="mt-4 space-y-2 text-sm text-green-600">
                <p>Home Energy: {result.emissions.home_energy} kg CO₂e</p>
                <p>Transportation: {result.emissions.transportation} kg CO₂e</p>
                <p>Diet: {result.emissions.diet} kg CO₂e</p>
                <p>Waste: {result.emissions.waste} kg CO₂e</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-3">Recommendations 💡</h4>
              <div className="space-y-3">
                {result.analysis && (
                  <>
                    <p className="text-sm text-green-700">{result.analysis.summary}</p>
                    <ul className="space-y-1 text-sm text-green-600">
                      {result.analysis.recommendations && result.analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-green-700">{recommendation.action} ({recommendation.category}) - {recommendation.potential_impact}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Button to navigate to StatsDashboard, shown only when results are available */}
        {result && (
          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate("/stats-dashboard")} variant="secondary" size="lg" className="px-8 py-3 text-lg">
              View My Stats 📊
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonTrackingPage;
