// pages/Tips.jsx
import React from 'react';

const Tips = () => {
 const tips = {
   home: [
     {
       title: "Energy Efficient Lighting 💡",
       tips: [
         "Switch to LED bulbs",
         "Use natural light when possible",
         "Install motion sensors"
       ]
     },
     {
       title: "Smart Heating/Cooling 🌡️",
       tips: [
         "Install a programmable thermostat",
         "Maintain HVAC systems regularly",
         "Use weatherstripping on doors/windows"
       ]
     }
   ],
   transport: [
     {
       title: "Eco-friendly Travel 🚲",
       tips: [
         "Choose public transport",
         "Consider carpooling",
         "Walk or cycle for short distances"
       ]
     }
   ],
   lifestyle: [
     {
       title: "Sustainable Living 🌱",
       tips: [
         "Start composting",
         "Reduce single-use plastics",
         "Buy local produce"
       ]
     }
   ]
 };

 return (
   <div className="min-h-screen bg-green-50 py-12">
     <div className="max-w-4xl mx-auto px-4">
       <h1 className="text-4xl font-bold text-green-800 mb-8">Environmental Tips 🌍</h1>

       {Object.entries(tips).map(([category, categoryTips]) => (
         <div key={category} className="mb-8">
           <h2 className="text-2xl font-semibold text-green-700 capitalize mb-4">{category}</h2>
           <div className="grid md:grid-cols-2 gap-6">
             {categoryTips.map((section, index) => (
               <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                 <h3 className="text-xl font-semibold text-green-800 mb-4">{section.title}</h3>
                 <ul className="space-y-3">
                   {section.tips.map((tip, tipIndex) => (
                     <li key={tipIndex} className="flex items-start">
                       <span className="text-green-600 mr-2">•</span>
                       <span className="text-green-700">{tip}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
           </div>
         </div>
       ))}

       <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
         <h2 className="text-2xl font-semibold text-green-800 mb-4">Want More Personalized Tips? 🎯</h2>
         <p className="text-green-700 mb-6">Track your carbon footprint to receive customized recommendations</p>
         <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
           Start Tracking Now
         </button>
       </div>
     </div>
   </div>
 );
};

export default Tips;