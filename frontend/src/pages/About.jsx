// pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const About = () => {
 const features = [
   {
     icon: "📊",
     title: "Track Your Impact",
     description: "Monitor your daily carbon emissions from various activities like transportation and home energy use."
   },
   {
     icon: "🎯",
     title: "Get Personalized Tips",
     description: "Receive customized recommendations to help reduce your carbon footprint effectively."
   },
   {
     icon: "🏆",
     title: "Earn Achievements",
     description: "Complete eco-friendly challenges and earn badges as you progress on your green journey."
   },
   {
     icon: "📈",
     title: "Track Progress",
     description: "View detailed statistics and track your improvement over time with easy-to-read graphs."
   }
 ];

 const howItWorks = [
   {
     step: 1,
     title: "Create an Account",
     description: "Sign up and create your personal profile to start your eco-friendly journey."
   },
   {
     step: 2,
     title: "Track Your Activities",
     description: "Log your daily activities and energy consumption in our easy-to-use tracker."
   },
   {
     step: 3,
     title: "Get Insights",
     description: "Receive detailed analysis of your carbon footprint and personalized recommendations."
   },
   {
     step: 4,
     title: "Reduce & Improve",
     description: "Follow suggestions and track your progress as you reduce your environmental impact."
   }
 ];

 return (
   <div className="min-h-screen bg-green-50 py-8">
     <div className="max-w-6xl mx-auto px-6">
       {/* Hero Section */}
       <section className="text-center mb-16">
         <h1 className="text-4xl font-bold text-green-800 mb-6">
           Track, Reduce, and Improve Your Carbon Footprint 🌱
         </h1>
         <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
           EcoTrack helps you understand and reduce your environmental impact through personalized tracking and recommendations.
         </p>
         <Link to="/register">
           <Button variant="primary" size="lg">
             Start Your Green Journey
           </Button>
         </Link>
       </section>

       {/* Features */}
       <section className="mb-16">
         <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Key Features</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {features.map((feature, index) => (
             <Card key={index} variant="bordered" className="p-6 text-center">
               <span className="text-4xl mb-4 block">{feature.icon}</span>
               <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
               <p className="text-green-700">{feature.description}</p>
             </Card>
           ))}
         </div>
       </section>

       {/* How It Works */}
       <section className="mb-16">
         <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">How It Works</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {howItWorks.map((step, index) => (
             <Card key={index} variant="bordered" className="p-6">
               <div className="text-center">
                 <span className="inline-block w-10 h-10 rounded-full bg-green-600 text-white text-xl font-bold leading-10 mb-4">
                   {step.step}
                 </span>
                 <h3 className="text-xl font-semibold text-green-800 mb-2">{step.title}</h3>
                 <p className="text-green-700">{step.description}</p>
               </div>
             </Card>
           ))}
         </div>
       </section>

       {/* Call to Action */}
       <section className="text-center">
         <Card variant="bordered" className="p-8">
           <h2 className="text-2xl font-semibold text-green-800 mb-4">
             Ready to Make a Difference? 🌍
           </h2>
           <p className="text-green-700 mb-6">
             Join thousands of others who are taking steps to reduce their carbon footprint.
           </p>
           <div className="space-x-4">
             <Link to="/register">
               <Button variant="primary" size="lg">
                 Get Started
               </Button>
             </Link>
             <Link to="/faq">
               <Button variant="outline" size="lg">
                 Learn More
               </Button>
             </Link>
           </div>
         </Card>
       </section>
     </div>
   </div>
 );
};

export default About;