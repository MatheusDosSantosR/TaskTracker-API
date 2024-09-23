import { Router } from 'express';
import { createTodo, getTodos } from '../controllers/todoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);

// Outras rotas: GET /:id, PUT /:id, DELETE /:id

export default router;
