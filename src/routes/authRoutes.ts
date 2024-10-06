import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();
console.log("controller")
// Rota para criar um novo usuário
router.post('/', (req, res) => authController.authUser(req, res));

export default router;
