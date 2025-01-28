import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCarbonQuestions, submitCarbonData } from "../services/carbonService";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const CarbonTrackingPage = () => {
 const { user } = useAuth();
 const [questions, setQuestions] = useState(null);
 const [userInput, setUserInput] = useState({
   "Home Energy": {
     "1": "", // electricity bill
     "2": ""  // heating type
   },
   "Transportation": {
     "1": "", // vehicle type
     "3": "", // weekly distance
     "4": "0", // short haul flights
     "5": "0", // medium haul flights
     "6": "0"  // long haul flights
   },
   "Diet": {
     "1": "" // meat days per week
   },
   "Waste": {
     "5": "" // bags per week
   }
 });
 const [loading, setLoading] = useState(false);
 const [submitting, setSubmitting] = useState(false);
 const [error, setError] = useState(null);
 const [result, setResult] = useState(null);

 useEffect(() => {
   const fetchQuestions = async () => {
     try {
       setLoading(true);
       const data = await getCarbonQuestions(user.token);
       setQuestions(data.questions);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };

   fetchQuestions();
 }, [user.token]);

 const handleInputChange = (category, field, value) => {
   setUserInput(prev => ({
     ...prev,
     [category]: {
       ...prev[category],
       [field]: value + (field === "1" && category === "Home Energy" ? " kWh" : "")
     }
   }));
 };

 const handleSubmit = async () => {
   try {
     setSubmitting(true);
     setError(null);
     const data = await submitCarbonData(user.token, userInput);
     setResult(data);
   } catch (err) {
     setError(err.message);
   } finally {
     setSubmitting(false);
   }
 };

 if (loading) {
   return (
     <div className="min-h-screen bg-green-50 flex items-center justify-center">
       <Loader size="lg" />
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-green-50 py-8">
     <div className="max-w-6xl mx-auto px-6">
       <div className="flex justify-between items-center mb-10">
         <h2 className="text-3xl font-semibold text-green-800">Carbon Footprint Tracker</h2>
         <Link
           to="/dashboard"
           className="text-green-600 hover:text-green-700 flex items-center gap-2"
         >
           ← Back to Dashboard
         </Link>
       </div>

       {error && <Alert type="error" message={error} className="mb-6" />}

       <div className="grid md:grid-cols-2 gap-10">
         {/* Home Energy Card */}
         <Card variant="bordered" className="p-8">
           <h3 className="text-2xl text-green-700 mb-8">🏠 Home Energy</h3>
           <div className="space-y-8">
             <Input
               label="Monthly Electricity Bill (kWh)"
               type="number"
               value={userInput["Home Energy"]["1"].replace(" kWh", "")}
               onChange={(e) => handleInputChange("Home Energy", "1", e.target.value)}
             />
             <Select
               label="Heating Type"
               options={[
                 { value: "Gas", label: "Natural Gas" },
                 { value: "Electric", label: "Electric" },
                 { value: "Oil", label: "Oil" },
               ]}
               value={userInput["Home Energy"]["2"]}
               onChange={(e) => handleInputChange("Home Energy", "2", e.target.value)}
             />
           </div>
         </Card>

         {/* Transportation Card */}
         <Card variant="bordered" className="p-8">
           <h3 className="text-2xl text-green-700 mb-8">🚗 Transportation</h3>
           <div className="space-y-8">
             <Select
               label="Vehicle Type"
               options={[
                 { value: "Gasoline", label: "Gasoline" },
                 { value: "Diesel", label: "Diesel" },
                 { value: "Hybrid", label: "Hybrid" },
                 { value: "Electric", label: "Electric" },
               ]}
               value={userInput["Transportation"]["1"]}
               onChange={(e) => handleInputChange("Transportation", "1", e.target.value)}
             />
             <Input
               label="Weekly Distance (km)"
               type="number"
               value={userInput["Transportation"]["3"]}
               onChange={(e) => handleInputChange("Transportation", "3", e.target.value)}
             />
             <Input
               label="Short-haul Flights (per year)"
               type="number"
               value={userInput["Transportation"]["4"]}
               onChange={(e) => handleInputChange("Transportation", "4", e.target.value)}
             />
             <Input
               label="Medium-haul Flights (per year)"
               type="number"
               value={userInput["Transportation"]["5"]}
               onChange={(e) => handleInputChange("Transportation", "5", e.target.value)}
             />
             <Input
               label="Long-haul Flights (per year)"
               type="number"
               value={userInput["Transportation"]["6"]}
               onChange={(e) => handleInputChange("Transportation", "6", e.target.value)}
             />
           </div>
         </Card>

         {/* Diet Card */}
         <Card variant="bordered" className="p-8">
           <h3 className="text-2xl text-green-700 mb-8">🍽️ Diet</h3>
           <Input
             label="Meat Days per Week"
             type="number"
             value={userInput["Diet"]["1"]}
             onChange={(e) => handleInputChange("Diet", "1", e.target.value)}
           />
         </Card>

         {/* Waste Card */}
         <Card variant="bordered" className="p-8">
           <h3 className="text-2xl text-green-700 mb-8">🗑️ Waste</h3>
           <Input
             label="Bags of Waste per Week"
             type="number"
             value={userInput["Waste"]["5"]}
             onChange={(e) => handleInputChange("Waste", "5", e.target.value)}
           />
         </Card>
       </div>

       <div className="mt-10 flex justify-center">
         <Button
           onClick={handleSubmit}
           variant="primary"
           size="lg"
           className="px-12 py-4 text-lg"
           disabled={submitting}
         >
           {submitting ? <Loader size="sm" /> : "Calculate Footprint 🌱"}
         </Button>
       </div>

       {result && (
         <Card variant="bordered" className="mt-10 p-8">
           <h3 className="text-2xl font-bold text-green-800 mb-6">Results 📊</h3>
           <div className="bg-green-50 p-6 rounded-lg mb-6">
             <p className="text-xl font-semibold text-green-700">
               Annual Carbon Footprint: {result.carbon_footprint.total} kg CO₂
             </p>
             <div className="mt-4 space-y-2">
               <p className="text-green-600">Home Energy: {result.carbon_footprint.home_energy} kg CO₂</p>
               <p className="text-green-600">Transportation: {result.carbon_footprint.transportation} kg CO₂</p>
               <p className="text-green-600">Diet: {result.carbon_footprint.diet} kg CO₂</p>
               <p className="text-green-600">Waste: {result.carbon_footprint.waste} kg CO₂</p>
             </div>
           </div>
           <div>
             <h4 className="text-lg font-semibold text-green-800 mb-3">Recommendations 💡</h4>
             <div className="space-y-4">
               {result.critique_and_tips && (
                 <>
                   <p className="text-green-700 font-medium">{result.critique_and_tips.critique}</p>
                   <ul className="space-y-2">
                     {Object.entries(result.critique_and_tips.tips).map(([category, tip]) => (
                       <li key={category} className="flex items-start">
                         <span className="text-green-600 mr-2">•</span>
                         <span className="text-green-700">{tip}</span>
                       </li>
                     ))}
                   </ul>
                 </>
               )}
             </div>
           </div>
         </Card>
       )}
     </div>
   </div>
 );
};

export default CarbonTrackingPage;