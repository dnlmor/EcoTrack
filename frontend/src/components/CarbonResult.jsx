import React from "react";

const CarbonResult = ({ result }) => (
  <div className="p-6 bg-green-50 rounded-lg shadow-md">
    <h3 className="text-xl font-bold">Your Carbon Footprint</h3>
    <p className="text-lg text-gray-700 mt-4">Score: {result?.carbon_footprint || "N/A"} kg</p>
    <p className="text-gray-600 mt-2">{result?.description || "No additional details available."}</p>
  </div>
);

export default CarbonResult;
