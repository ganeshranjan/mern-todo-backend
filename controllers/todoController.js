const Todo = require("../models/Todo");

const createTodo = async (req, res, next) => {
  try {
    const { task, urgent } = req.body;

    console.log("console 1", req, req.userId);
    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }
    const todo = await Todo.create({
      task,
      urgent: urgent,
      user: req.userId,
    });
    console.log("Model collection name:", Todo.collection.name);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
  res.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.status(200).json(todos);
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
