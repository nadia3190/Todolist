import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

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

      <button onClick={() => deleteTodo(todo._id)}>
        {" "}
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {isEditing ? (
        <button onClick={handleUpdate}>
          {" "}
          <FontAwesomeIcon icon={faSave} />
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          {" "}
          <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
    </div>
  );
};

export default TodoItem;
