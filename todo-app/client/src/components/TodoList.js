import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/todos");
        setTodos(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async (todo) => {
    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        title: todo.title,
      }); // Ensure correct URL
      setTodos([...todos, res.data]);
    } catch (err) {
      console.error(err.message); // Log any errors
    }
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
