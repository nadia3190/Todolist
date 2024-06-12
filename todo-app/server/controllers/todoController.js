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

exports.updateTodo = async (req, res) => {
  const { title, completed } = req.body;

  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    todo.title = title || todo.title;
    todo.completed = completed != null ? completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
