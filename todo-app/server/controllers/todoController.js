const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    const newTodo = new Todo({
      user: userId,
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
  const userId = req.user.id;

  try {
    const todos = await Todo.find({ user: userId });
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

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

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

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
