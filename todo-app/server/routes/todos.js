const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.post("/", createTodo);

router.get("/", getTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
module.exports = router;
