// services/gameService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8003/game";

// Start the quiz
export const startQuiz = async (token) => {
  try {
    const response = await fetch(`${API_URL}/quiz/start?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to start quiz');
    }

    // Return the quiz data (user_id and questions)
    return await response.json();
  } catch (error) {
    console.error('Error starting quiz:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Submit answers to the quiz
export const submitQuizAnswers = async (token, answers) => {
  const user_answers = answers.map(answer => answer.toLowerCase());
  console.log('Submitting answers:', user_answers); // Debug log

  try {
    const response = await fetch(`${API_URL}/quiz/submit?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(user_answers),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Server error:', error); // Debug log
      throw new Error(error.detail || 'Failed to submit answers');
    }

    const data = await response.json();
    console.log('Server response:', data); // Debug log
    return data; // Return the quiz result including analysis
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Get user's highest scores
export const getUserHighestScores = async (token) => {
  try {
    const response = await fetch(`${API_URL}/quiz/results?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user scores');
    }

    const scores = await response.json();

    // Sort scores from highest to lowest
    return scores.sort((a, b) => b.total_score - a.total_score); // Ensure sorting by total_score
  } catch (error) {
    console.error('Error fetching user highest scores:', error);
    throw error; // Rethrow the error for further handling
  }
};