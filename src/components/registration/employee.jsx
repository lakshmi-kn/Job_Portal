import React, { useState } from 'react';
import './register.css';

function Employee() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    skills: '',
    experience: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/register-jobseeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Registration successful!');
        console.log(result);
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };
    

  return (
    <div className="register-container">
      <h2>Job Seeker Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
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
};

export default Employee;
