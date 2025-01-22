import React, { useState } from "react";

const CarbonInputForm = ({ onComplete, questions, submitData }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await submitData(formData);
      onComplete(); // Trigger callback after successful submission
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit your responses. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      {questions.map((q) => (
        <div key={q.id}>
          <label htmlFor={q.id} className="block text-gray-600">
            {q.text}
          </label>
          <input
            id={q.id}
            type={q.type || "text"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData[q.id] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default CarbonInputForm;
