import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { startQuiz, submitQuizAnswers, getUserHighestScores } from '../services/gameService';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

const Game = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await startQuiz(user.token);
        console.log('Quiz data received:', data);
        setQuizData({
          userId: data.user_id,
          questions: data.questions.map(q => ({
            question: q.question,
            options: q.options
          }))
        });
      } catch (err) {
        console.error('Quiz fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [user.token]);

  const handleAnswerSelect = async (answer) => {
    const newAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(newAnswers);

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        setLoading(true);
        // Ensure answers are in the right format
        const formattedAnswers = newAnswers.map(answer => answer.trim());
        console.log("Submitting answers:", formattedAnswers);

        const resultsData = await submitQuizAnswers(user.token, formattedAnswers);
        setResults(resultsData);
        setQuizComplete(true);
        
        // Fetch leaderboard after quiz completion
        await fetchLeaderboard();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const scores = await getUserHighestScores(user.token);
      console.log('Leaderboard data received:', scores);
      setLeaderboard(scores); // Store leaderboard data
    } catch (err) {
      console.error('Leaderboard fetch error:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-50 p-6">
        <Alert type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        {!quizComplete ? (
          <Card variant="bordered" className="p-8 shadow-lg">
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-green-800">Eco Quiz 🌍</h2>
                <span className="text-green-600 text-lg">
                  Question {currentQuestion + 1} of {quizData?.questions?.length || 0}
                </span>
              </div>
              <div className="h-3 bg-green-100 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / (quizData?.questions?.length || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {quizData?.questions?.[currentQuestion] && (
              <div className="space-y-8">
                <h3 className="text-2xl text-green-700 font-medium">
                  {quizData.questions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {quizData.questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start py-5 px-6 text-lg hover:bg-green-50"
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <span className="font-semibold mr-4 text-green-700">{option}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <>
            <Card variant="bordered" className="p-8 shadow-lg mb-6">
              <h2 className="text-3xl font-bold text-green-800 mb-8">Quiz Results 📊</h2>

              <div className="bg-green-50 p-8 rounded-xl mb-10">
                <p className="text-3xl font-semibold text-green-700 mb-6">
                  Score: {results?.quiz_details?.score || 0}%
                </p>
                <div className="space-y-3">
                  <p className="text-lg text-green-600">
                    Correct Answers: {results?.quiz_details?.correct_answers || 0}
                  </p>
                  <p className="text-lg text-green-600">
                    Wrong Answers: {results?.quiz_details?.wrong_answers || 0}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">Overall Assessment</h3>
                  <p className="text-lg text-green-700">{results?.analysis?.overall_assessment}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">Strengths</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {(Array.isArray(results?.analysis?.strengths) ? results.analysis.strengths : []).map((strength, index) => (
                      <li key={index} className="text-lg text-green-700">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">Areas for Improvement</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {(Array.isArray(results?.analysis?.improvement_areas) ? results.analysis.improvement_areas : []).map((improvement, index) => (
                      <li key={index} className="text-lg text-green-700">{improvement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">Learning Resources</h3>
                  {Object.entries(results?.analysis?.learning_resources || {}).map(([topic, resource], index) => (
                    <p key={index} className="text-lg text-green-700">{topic}: {resource}</p>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Encouragement</h3>
                  <p className="text-lg text-green-700">{results?.analysis?.encouragement}</p>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-10 py-4 text-lg"
                onClick={() => window.location.reload()}
              >
                Try Another Quiz 🔄
              </Button>
            </Card>

            <Card variant="bordered" className="p-8 shadow-lg">
              <h2 className="text-xl font-bold text-green-800 mb-4">Leaderboard 🏆</h2>
              {leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
                  <div key={player.quiz_id} className={`flex justify-between py-2 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <span>{index + 1}. {player.username}</span>
                    <span>{player.total_score}%</span>
                  </div>
                ))
              ) : (
                <p>No leaderboard data available.</p>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;