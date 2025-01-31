import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8002/api/v1/carbon";

// Fetch carbon footprint questions
export const getCarbonQuestions = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/carbon-footprint/questions`, {
      params: { token },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data || !response.data.questions) {
      throw new Error('No questions data available');
    }

    return response.data; // Returns { questions: [...categories] }

  } catch (error) {
    handleError(error);
  }
};

// Submit user's carbon footprint data
export const submitCarbonData = async (token, userAnswers) => {
  try {
    const response = await axios.post(`${API_URL}/carbon-footprint/submit`, userAnswers, {
      params: { token },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data directly

  } catch (error) {
    handleError(error);
  }
};

// Fetch user's carbon footprint results
export const getCarbonResults = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/carbon-footprint/results`, {
      params: { token },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data directly

  } catch (error) {
    handleError(error);
  }
};

// Generic error handler for axios requests
const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    // Handle Axios specific errors
    const errorMessage = error.response?.data?.detail || error.message || 'An error occurred';
    const errorStatus = error.response?.status || 'Unknown status';
    console.error(`API Error: ${errorStatus} - ${errorMessage}`);
    throw new Error(`Error: ${errorStatus} - ${errorMessage}`);
  } else {
    // Handle other errors (e.g., network errors)
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};
