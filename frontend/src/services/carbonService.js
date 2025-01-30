import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8002";

// Fetch the carbon questions
export const getCarbonQuestions = async (token) => {
  console.log('Making request to:', `${API_URL}/api/v1/carbon/carbon-footprint/start?token=${token}`); // Debug log
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/carbon/carbon-footprint/start?token=${token}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Request error:', error);
    throw error.response?.data || error;
  }
};

// Submit carbon data
export const submitCarbonData = async (token, answers) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/carbon/carbon-footprint/submit?token=${token}`,
      answers,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Submission error:', error);
    throw error.response?.data || error;
  }
};

// Fetch carbon footprint results
export const fetchCarbonFootprintResults = async (token) => {
  console.log("Requesting carbon footprint results with token:", token);  // Debug log
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/carbon/carbon-footprint/results?token=${token}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Request error:', error);  // Log the error
    throw error.response?.data || error;
  }
};
