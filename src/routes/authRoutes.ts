import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();
// Rota para criar um novo usuário
router.post('/', (req, res) => authController.authUser(req, res));

export default router;
