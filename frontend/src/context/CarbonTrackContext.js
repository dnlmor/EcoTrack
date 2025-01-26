import React, { createContext, useState, useContext } from "react";
import { fetchCarbonQuestions, submitCarbonData, fetchLeaderboard } from "../services/carbonService";

// Create a context for carbon tracking
const CarbonTrackContext = createContext();

export const useCarbonTrack = () => {
  return useContext(CarbonTrackContext);
};

export const CarbonTrackProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  // Fetch questions from the API
  const loadQuestions = async () => {
    try {
      const fetchedQuestions = await fetchCarbonQuestions();
      setQuestions(fetchedQuestions);
    } catch (err) {
      setError("Failed to load questions");
    }
  };

  // Submit the carbon data
  const submitData = async () => {
    try {
      await submitCarbonData(responses);
    } catch (err) {
      setError("Failed to submit data");
    }
  };

  // Fetch the leaderboard
  const loadLeaderboard = async () => {
    try {
      const fetchedLeaderboard = await fetchLeaderboard();
      setLeaderboard(fetchedLeaderboard);
    } catch (err) {
      setError("Failed to load leaderboard");
    }
  };

  return (
    <CarbonTrackContext.Provider
      value={{
        questions,
        responses,
        setResponses,
        leaderboard,
        error,
        loadQuestions,
        submitData,
        loadLeaderboard,
      }}
    >
      {children}
    </CarbonTrackContext.Provider>
  );
};
