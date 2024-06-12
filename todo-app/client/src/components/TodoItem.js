import React, { useState } from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    updateTodo(todo._id, newTitle);
    setIsEditing(false);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo._id, !todo.completed)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </span>
      )}

      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
      {isEditing ? (
        <button onClick={handleUpdate}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Update</button>
      )}
    </div>
  );
};

export default TodoItem;
