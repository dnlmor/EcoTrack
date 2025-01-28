// services/gameService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8003";

export const startQuiz = async (token) => {
  const response = await fetch(`${API_URL}/game/play?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ token })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to start quiz');
  }

  return response.json();
};

export const submitQuizAnswers = async (token, answers) => {
  // Ensure answers are formatted as lowercase strings
  const user_answers = answers.map(answer => answer.toLowerCase());

  console.log('Submitting answers:', user_answers); // Debug log

  const response = await fetch(`${API_URL}/game/results?token=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    // Directly send the array as the body
    body: JSON.stringify(user_answers),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Server error:', error); // Debug log
    throw new Error(error.detail || 'Failed to submit answers');
  }

  const data = await response.json();
  console.log('Server response:', data); // Debug log
  return data;
};
