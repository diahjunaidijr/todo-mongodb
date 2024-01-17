const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create Todo
router.post('/create', todoController.createTodo);

// Get All Todos
router.get('/all', todoController.getAllTodos);

// Get Todo by ID
router.get('/:id', todoController.getTodoById);

// Update Todo
router.put('/:id', todoController.updateTodo);

// Delete Todo
router.delete('/:id', todoController.deleteTodo);

// Delete All Todos
router.delete('/', todoController.deleteAllTodos);

module.exports = router;
