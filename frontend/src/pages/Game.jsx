// pages/Game.jsx
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Mock questions - will be replaced with API data
  const questions = [
    {
      question: "Which of these activities produces the most carbon emissions?",
      options: [
        "Taking a short flight",
        "Driving a car for a day",
        "Using air conditioning",
        "Eating a beef burger"
      ],
      correct: 0
    },
    {
      question: "What percentage of global carbon emissions come from transportation?",
      options: ["10%", "20%", "25%", "30%"],
      correct: 2
    }
  ];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-green-800 mb-8">Eco Quiz Challenge 🌍</h1>

        <Card variant="bordered" className="p-8">
          {!showResult ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-green-700">Question {currentQuestion + 1}/{questions.length}</span>
                <span className="text-green-700">Score: {score}</span>
              </div>
              
              <h2 className="text-xl font-semibold text-green-800 mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className="w-full text-left justify-start"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Quiz Complete! 🎉</h2>
              <p className="text-xl text-green-700 mb-6">Your Score: {score}/{questions.length}</p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowResult(false);
                }}
              >
                Play Again 🔄
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Game;