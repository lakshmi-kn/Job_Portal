// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Optional if you want to style it

const Header = () => {
  return (
    <header className="header">
      <h1>Job Portal</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
