import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarbonTrackProvider } from "./context/CarbonTrackContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StatsDashboard from "./pages/StatsDashboard";
import CarbonTrackingPage from "./pages/CarbonTrackingPage";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Tips from "./pages/Tips";
import FAQ from "./pages/Faq";

function App() {
  return (
    <AuthProvider>
      <CarbonTrackProvider>
        <Router>
          <Navigation />
          <Routes>
            {/* Public Routes */}

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={

                  <Dashboard />
  
              }
            />
            <Route
              path="/stats-dashboard"
              element={
      
                  <StatsDashboard />
                
              }
            />
            <Route
              path="/carbon-tracking"
              element={
              
                  <CarbonTrackingPage />
                
              }
            />
          </Routes>
        </Router>
      </CarbonTrackProvider>
    </AuthProvider>
  );
}

export default App;
