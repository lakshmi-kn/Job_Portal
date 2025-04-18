import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import './home.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Welcome to the Job Portal</h2>
        <p>Please select your role to continue:</p>
        <div className="button-group">
          <button onClick={() => navigate('/register-employee')}>I am a Job Seeker</button>
          <button onClick={() => navigate('/register-employer')}>I am an Employer</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
