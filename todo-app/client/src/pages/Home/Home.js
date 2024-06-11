import React from "react";
import "./Home.css";
import TodoList from "../../components/TodoList";

const Home = () => {
  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
};

export default Home;
//home.js
