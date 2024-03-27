import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './homePage.css'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Welcome to Quiz App</h1>
      <div className="buttons-container">
        <Link to="/adminDashboard" className="dashboard-button">Admin Dashboard</Link>
        <Link to="/student/student_11" className="dashboard-button">Student Dashboard</Link>
      </div>
    </div>
  );
};

export default HomePage;
