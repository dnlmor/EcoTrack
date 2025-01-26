// pages/CarbonTrackingPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { submitCarbonData } from "../services/carbonService";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const CarbonTrackingPage = () => {
 const [userInput, setUserInput] = useState({
   home_energy: {},
   transportation: {}
 });
 const [loading, setLoading] = useState(false);
 const [submissionResult, setSubmissionResult] = useState(null);
 const navigate = useNavigate();

 const transportOptions = [
   { value: "electric", label: "Electric Vehicle" },
   { value: "hybrid", label: "Hybrid" },
   { value: "gasoline", label: "Gasoline" },
   { value: "diesel", label: "Diesel" }
 ];

 const heatingOptions = [
   { value: "gas", label: "Natural Gas" },
   { value: "electric", label: "Electric" },
   { value: "oil", label: "Oil" },
   { value: "renewable", label: "Renewable" }
 ];

 const handleInputChange = (category, field, value) => {
   setUserInput(prev => ({
     ...prev,
     [category]: { ...prev[category], [field]: value }
   }));
 };

 const handleSubmit = async () => {
   setLoading(true);
   try {
     const response = await submitCarbonData(userInput);
     setSubmissionResult(response);
   } catch (error) {
     setSubmissionResult({ error: "Failed to calculate carbon footprint" });
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="min-h-screen bg-green-50 py-8">
     <div className="max-w-6xl mx-auto px-6">
       <div className="flex justify-between items-center mb-10">
         <h2 className="text-3xl font-semibold text-green-800">Carbon Footprint Tracker</h2>
         <Button 
           onClick={() => navigate("/stats-dashboard")} 
           variant="secondary"
         >
           ← Back to Dashboard
         </Button>
       </div>

       <div className="grid md:grid-cols-2 gap-10">
         <Card variant="bordered" className="p-8">
           <h3 className="text-2xl text-green-700 mb-8">🏠 Home Energy</h3>
           <div className="space-y-8">
             <Input
               label="Monthly Electricity Bill ($)"
               type="number"
               value={userInput.home_energy.electricity_bill || ''}
               onChange={(e) => handleInputChange("home_energy", "electricity_bill", e.target.value)}
               className="h-14"
             />
             <Select
               label="Heating Type"
               options={heatingOptions}
               value={userInput.home_energy.heating_type || ''}
               onChange={(e) => handleInputChange("home_energy", "heating_type", e.target.value)}
               className="h-14"
             />
           </div>
         </Card>

         <Card variant="bordered" className="p-8">
           <h3 className="text-2xl text-green-700 mb-8">🚗 Transportation</h3>
           <div className="space-y-8">
             <Select
               label="Vehicle Type"
               options={transportOptions}
               value={userInput.transportation.car_type || ''}
               onChange={(e) => handleInputChange("transportation", "car_type", e.target.value)}
               className="h-14"
             />
             <Input
               label="Weekly Distance (km)"
               type="number"
               value={userInput.transportation.weekly_distance_km || ''}
               onChange={(e) => handleInputChange("transportation", "weekly_distance_km", e.target.value)}
               className="h-14"
             />
           </div>
         </Card>
       </div>

       <div className="mt-10 flex justify-center">
         <Button 
           onClick={handleSubmit}
           variant="primary"
           size="lg"
           className="px-12 py-4 text-lg"
           disabled={loading}
         >
           {loading ? <Loader size="sm" /> : "Calculate Footprint 🌱"}
         </Button>
       </div>

       {submissionResult && (
         <Card variant="bordered" className="mt-10">
           <h3 className="text-2xl font-bold text-green-800 mb-4">Results 📊</h3>
           {submissionResult.error ? (
             <Alert type="error" message={submissionResult.error} />
           ) : (
             <>
               <div className="bg-green-50 p-6 rounded-lg mb-6">
                 <p className="text-xl font-semibold text-green-700">
                   Annual Carbon Footprint: {submissionResult.carbon_footprint} kg CO₂
                 </p>
               </div>
               <div>
                 <h4 className="text-lg font-semibold text-green-800 mb-3">Recommendations 💡</h4>
                 <ul className="space-y-2">
                   {submissionResult.critique_and_tips?.split("\n").map((tip, index) => (
                     <li key={index} className="flex items-start">
                       <span className="text-green-600 mr-2">•</span>
                       <span className="text-green-700">{tip}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             </>
           )}
         </Card>
       )}
     </div>
   </div>
 );
};

export default CarbonTrackingPage;