import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function Home() {
  return <h1>Welcome to Homepage</h1>
}

function Dashboard() {
  return <h1>Welcome to Dashboard</h1>
}

function App() {
  return (
      <Router>
        <div>
      <header>
        <h1>This is EcoTrack</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      </div>
      </Router>
  );
}

export default App;
