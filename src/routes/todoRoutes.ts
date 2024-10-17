import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller.js';

const router = Router();
const todoController = new TodoController();

router.post('/', (req, res,next) => todoController.createTodo(req, res,next));
router.put('/:id', (req, res,next) => todoController.updateTodo(req, res,next));
router.delete('/:id', (req, res,next) => todoController.deleteTodo(req, res,next));
router.get('/', (req, res,next) => todoController.getTodos(req, res,next));

export default router;