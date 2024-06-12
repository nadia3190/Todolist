import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get("http://localhost:5000/home/api/todos", {
          headers: { "x-auth-token": token },
        });

        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err.message);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.post(
        "http://localhost:5000/home/api/todos",
        { title: todo.title },
        {
          headers: { "x-auth-token": token },
        }
      );

      setTodos([...todos, res.data]);
    } catch (err) {
      console.error("Error adding todo:", err.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.patch(
        `http://localhost:5000/home/api/todos/${id}`,
        { completed },
        {
          headers: { "x-auth-token": token },
        }
      );

      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("Error toggling todo:", err.message);
    }
  };

  const updateTodo = async (id, title) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.patch(
        `http://localhost:5000/home/api/todos/${id}`,
        { title },
        {
          headers: { "x-auth-token": token },
        }
      );

      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:5000/home/api/todos/${id}`, {
        headers: { "x-auth-token": token },
      });

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
