const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const auth = require("../middleware/auth");

router.post("/api/todos", auth, createTodo);

router.get("/api/todos", auth, getTodos);

router.patch("/api/todos/:id", auth, updateTodo);

router.delete("/api/todos/:id", auth, deleteTodo);

module.exports = router;
