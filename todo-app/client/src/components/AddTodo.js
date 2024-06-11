import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState(""); // State to manage the title of the new todo

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to add a new todo
      const res = await axios.post("http://localhost:5000/api/todos", {
        title,
      });
      addTodo(res.data);
      setTitle("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
