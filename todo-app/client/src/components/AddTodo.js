import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Sending a POST request to add a new todo
      const res = await axios.post(
        "http://localhost:5000/home/api/todos",
        { title },
        {
          headers: { "x-auth-token": token },
        }
      );
      addTodo(res.data);
      setTitle("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="add-todo-form">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
