// CarbonTrackContext.js
import React, { createContext, useState, useContext } from "react";
import { getCarbonQuestions, submitCarbonData, getCarbonResults } from "../services/carbonService";

const CarbonTrackContext = createContext();

export const useCarbonTrack = () => useContext(CarbonTrackContext);

export const CarbonTrackProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const loadQuestions = async (token) => {
    try {
      const data = await getCarbonQuestions(token);
      setQuestions(data.questions);
    } catch (err) {
      setError(err.message);
    }
  };

  const submitData = async (token) => {
    try {
      await submitCarbonData(token, responses);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadResults = async (token) => {
    try {
      const data = await getCarbonResults(token);
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CarbonTrackContext.Provider value={{ questions, responses, setResponses, results, error, loadQuestions, submitData, loadResults }}>
      {children}
    </CarbonTrackContext.Provider>
  );
};