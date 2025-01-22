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

function App() {
  return (
    <AuthProvider>
      <CarbonTrackProvider>
        <Router>
          <Navigation />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/stats-dashboard"
              element={
                <PrivateRoute>
                  <StatsDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/carbon-tracking"
              element={
                <PrivateRoute>
                  <CarbonTrackingPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CarbonTrackProvider>
    </AuthProvider>
  );
}

export default App;
