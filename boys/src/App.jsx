import "./nav.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './Sign';
import MovieList from './MovieList';
import Sports from './Sports';  // Make sure Sports component is properly defined
import Finance from './Finance';  // Make sure Finance component is properly defined
import ErrorBoundary from './ErrorBoundary';  // Import ErrorBoundary component
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route path="/MovieList" element={<MovieList />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
