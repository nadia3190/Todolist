const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const newTodo = new Todo({
      title,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
