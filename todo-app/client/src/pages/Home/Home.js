import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import TodoList from "../../components/TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
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
