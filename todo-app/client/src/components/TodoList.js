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

  const toggleComplete = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/todos/${id}`, {
        completed: true,
      });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err.message); // Log any errors
    }
  };
  // Function to update a todo
  const updateTodo = async (id, title) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/todos/${id}`, {
        title,
      }); // Ensure correct URL
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err.message); // Log any errors
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`); // Ensure correct URL
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err.message); // Log any errors
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
