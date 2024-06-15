import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import TodoList from "../../components/TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <h2>Welcome, {userName}!</h2>
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
      <div className="todo">
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
