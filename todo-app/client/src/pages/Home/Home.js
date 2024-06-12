import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import TodoList from "../../components/TodoList";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <TodoList />
    </div>
  );
};

export default Home;
