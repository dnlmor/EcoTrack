import React, { createContext, useState, useContext } from "react";
import { getCarbonQuestions, submitCarbonData, fetchCarbonFootprintResults } from "../services/carbonService";

// Create a context for carbon tracking
const CarbonTrackContext = createContext();

export const useCarbonTrack = () => {
  return useContext(CarbonTrackContext);
};

export const CarbonTrackProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [tracklist, setTracklist] = useState([]); // Renamed leaderboard to tracklist
  const [error, setError] = useState(null);

  // Fetch questions from the API
  const loadQuestions = async () => {
    try {
      const fetchedQuestions = await getCarbonQuestions();
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

  // Fetch the tracklist (previously leaderboard) data
  const loadTracklist = async (token) => {
    try {
      const fetchedTracklist = await fetchCarbonFootprintResults(token);
      setTracklist(fetchedTracklist.results || []); // Assuming 'results' field contains the tracklist data
    } catch (err) {
      setError("Failed to load tracklist");
    }
  };

  return (
    <CarbonTrackContext.Provider
      value={{
        questions,
        responses,
        setResponses,
        tracklist, // Renamed from leaderboard to tracklist
        error,
        loadQuestions,
        submitData,
        loadTracklist, // Updated method name to loadTracklist
      }}
    >
      {children}
    </CarbonTrackContext.Provider>
  );
};
