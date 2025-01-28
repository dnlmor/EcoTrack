import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { startQuiz, submitQuizAnswers } from '../services/gameService';
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
            options: {
              a: q.options.a,
              b: q.options.b,
              c: q.options.c,
              d: q.options.d
            }
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
    const newAnswers = [...selectedAnswers, answer.toLowerCase()]; // Ensure lowercase
    setSelectedAnswers(newAnswers);
  
    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        setLoading(true);
  
        // Submit the answers directly as a flat array
        const results = await submitQuizAnswers(user.token, newAnswers);
        setResults(results);
        setQuizComplete(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
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
    <div className="min-h-screen bg-green-50 py-12"> {/* Increased padding */}
      <div className="max-w-3xl mx-auto px-6"> {/* Increased padding */}
        {!quizComplete ? (
          <Card variant="bordered" className="p-8 shadow-lg"> {/* Added shadow */}
            <div className="mb-10"> {/* Increased margin */}
              <div className="flex justify-between items-center mb-6"> {/* Increased margin */}
                <h2 className="text-3xl font-semibold text-green-800">Eco Quiz 🌍</h2>
                <span className="text-green-600 text-lg"> {/* Increased text size */}
                  Question {currentQuestion + 1} of {quizData?.questions?.length || 0}
                </span>
              </div>
              <div className="h-3 bg-green-100 rounded-full"> {/* Increased height and full rounding */}
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / (quizData?.questions?.length || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
  
            {quizData?.questions?.[currentQuestion] && (
              <div className="space-y-8"> {/* Increased spacing */}
                <h3 className="text-2xl text-green-700 font-medium">
                  {quizData.questions[currentQuestion].question}
                </h3>
  
                <div className="space-y-4">
                  {Object.entries(quizData.questions[currentQuestion].options).map(([key, value]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="w-full text-left justify-start py-5 px-6 text-lg hover:bg-green-50" /* Increased padding and text size */
                      onClick={() => handleAnswerSelect(key)}
                    >
                      <span className="font-semibold mr-4 text-green-700">{key.toUpperCase()}.</span> {value}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card variant="bordered" className="p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-green-800 mb-8">Quiz Results 📊</h2>
            
            <div className="bg-green-50 p-8 rounded-xl mb-10"> {/* Increased padding and margin */}
              <p className="text-3xl font-semibold text-green-700 mb-6">
                Score: {results?.score || 0}% {/* Fixed object access */}
              </p>
              <div className="space-y-3">
                <p className="text-lg text-green-600">
                  Correct Answers: {results?.correct_answers || 0}
                </p>
                <p className="text-lg text-green-600">
                  Wrong Answers: {results?.wrong_answers || 0}
                </p>
              </div>
            </div>
  
            <div className="space-y-8"> {/* Increased spacing */}
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Overall Assessment
                </h3>
                <p className="text-lg text-green-700">{results?.overall_assessment}</p>
              </div>
  
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">Strengths</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {results?.strengths?.map((strength, index) => (
                    <li key={index} className="text-lg text-green-700">{strength}</li>
                  ))}
                </ul>
              </div>
  
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Areas for Improvement
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {results?.improvements?.map((improvement, index) => (
                    <li key={index} className="text-lg text-green-700">{improvement}</li>
                  ))}
                </ul>
              </div>
  
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Recommendations
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {results?.recommendations?.map((recommendation, index) => (
                    <li key={index} className="text-lg text-green-700">{recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>
  
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-10 py-4 text-lg" /* Increased padding and text size */
              onClick={() => window.location.reload()}
            >
              Try Another Quiz 🔄
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Game;