import React, { useState } from 'react';
import './register.css';

function Employer() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    location: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employer registration data:", formData);
    // Send to backend here
  };

  return (
    <div className="register-container">
      <h2>Employer Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Company Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Company Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Employer;
