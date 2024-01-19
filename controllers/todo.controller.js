const Todo = require('../models/todo.model');

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Tambahkan ini
    const { title, description, completed, userId } = req.body;
    const todo = new Todo({ title, description, completed, userId });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat membuat todo');
  }
};


// Get All Todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat mengambil todos');
  }
};

// Get Todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat mengambil todo');
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat mengupdate todo');
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat menghapus todo');
  }
};

// Delete All Todos
exports.deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.json({ message: 'Semua todos telah dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat menghapus semua todos');
  }
};
