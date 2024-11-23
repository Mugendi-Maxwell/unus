// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // Make sure you're using Link for routing

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">Unus</Link>
        <div className="navbar-menu">
          <div className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/MovieList" className="nav-link">Movies</Link>
          </div>
          <div className="nav-item">
            <Link to="/sports" className="nav-link">Talk</Link>
          </div>
          <div className="nav-item">
            <Link to="/finance" className="nav-link">Finance</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
