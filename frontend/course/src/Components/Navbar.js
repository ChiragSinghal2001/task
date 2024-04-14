import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [clickedButton, setClickedButton] = useState('');

  const handleClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={() => setClickedButton('')}>THRIVE</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" id="home" onClick={() => handleClick('home')} className={clickedButton === 'home' ? 'clicked' : ''}>Home</Link>
        <Link to="/courses" id="courses" onClick={() => handleClick('courses')} className={clickedButton === 'courses' ? 'clicked' : ''}>Courses</Link>
        <Link to="/pricing" id="pricing" onClick={() => handleClick('pricing')} className={clickedButton === 'pricing' ? 'clicked' : ''}>Pricing Plan</Link>
        <Link to="/about" id="about" onClick={() => handleClick('about')} className={clickedButton === 'about' ? 'clicked' : ''}>About</Link>
        <Link to="/contact" id="contact" onClick={() => handleClick('contact')} className={clickedButton === 'contact' ? 'clicked' : ''}>Contact Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;
