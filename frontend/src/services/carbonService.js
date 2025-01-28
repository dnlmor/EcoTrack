// services/carbonService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8002";

export const getCarbonQuestions = async (token) => {
  console.log('Making request to:', `${API_URL}/api/v1/carbon/carbon-footprint/start?token=${token}`); // Debug log
  try {
    const response = await fetch(`${API_URL}/api/v1/carbon/carbon-footprint/start?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to fetch: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Request error:', error); // Debug log
    throw error;
  }
};

export const submitCarbonData = async (token, answers) => {
  const response = await fetch(`${API_URL}/api/v1/carbon/carbon-footprint/submit?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(answers)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to submit data');
  }

  return response.json();
};

// Adding the missing exports
export const fetchCarbonQuestions = getCarbonQuestions; // Alias for backward compatibility

export const fetchLeaderboard = async (token) => {
  const response = await fetch(`${API_URL}/api/v1/carbon/leaderboard`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to fetch leaderboard');
  }

  return response.json();
};