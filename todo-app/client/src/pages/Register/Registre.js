import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      setSuccessMessage("Registration successful! You can now log in."); // Définir le message de confirmation
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="form-container">
      {successMessage ? (
        <div>
          <p>{successMessage}</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h1>Register</h1>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
