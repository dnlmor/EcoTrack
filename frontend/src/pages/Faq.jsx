// pages/FAQ.jsx
import React from 'react';

const FAQ = () => {
 const faqs = [
   {
     q: "What is a carbon footprint? 🤔",
     a: "A carbon footprint measures the total greenhouse gas emissions caused by an individual, event, organization, or product. It's expressed as carbon dioxide equivalent (CO2e)."
   },
   {
     q: "How accurate is the carbon footprint calculation? 📊",
     a: "Our calculations are based on standardized emission factors and your input data. While not exact, they provide a good estimate to track your environmental impact."
   },
   {
     q: "How often should I track my carbon footprint? 📅",
     a: "We recommend monthly tracking for the most accurate results. Regular tracking helps you identify patterns and improvement opportunities."
   },
   {
     q: "What activities contribute most to carbon footprint? 🌡️",
     a: "Major contributors include home energy use, transportation, diet, and consumer habits. Our tracking system helps identify your biggest impact areas."
   }
 ];

 return (
   <div className="min-h-screen bg-green-50 py-12">
     <div className="max-w-3xl mx-auto px-4">
       <h1 className="text-4xl font-bold text-green-800 mb-8">Frequently Asked Questions</h1>
       
       <div className="space-y-6">
         {faqs.map((faq, index) => (
           <div key={index} className="bg-white rounded-xl shadow-lg p-6">
             <h3 className="text-xl font-semibold text-green-800 mb-3">{faq.q}</h3>
             <p className="text-green-700">{faq.a}</p>
           </div>
         ))}
       </div>

       <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
         <h2 className="text-xl font-semibold text-green-800 mb-4">Still have questions? 💭</h2>
         <p className="text-green-700 mb-6">Contact our support team for more information</p>
         <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
           Contact Support
         </button>
       </div>
     </div>
   </div>
 );
};

export default FAQ;