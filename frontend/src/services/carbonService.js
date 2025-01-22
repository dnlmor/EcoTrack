const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8001";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorDetails}`);
  }
  return response.json();
};

// Fetch carbon questions for the user
export const fetchCarbonQuestions = async (token) => {
  try {
    const response = await fetch(`${API_URL}/carbon/questions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching carbon questions:", error);
    throw error;
  }
};

// Submit carbon data and get critique/tips
export const submitCarbonData = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}/carbon/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error submitting carbon data:", error);
    throw error;
  }
};

// Fetch the leaderboard
export const fetchLeaderboard = async (token) => {
  try {
    const response = await fetch(`${API_URL}/carbon/leaderboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};

// Fetch the carbon result
export const fetchCarbonResult = async (token) => {
  try {
    const response = await fetch(`${API_URL}/carbon/result`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching carbon result:", error);
    throw error;
  }
};
