import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Study Buddy AI</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/subjects">Subjects</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/progression">Progression</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;