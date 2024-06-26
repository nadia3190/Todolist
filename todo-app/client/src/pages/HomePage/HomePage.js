import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to Todo List App</h1>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
