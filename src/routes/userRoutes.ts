import { hash } from 'bcrypt';
import { Router } from 'express';
import { ProfileController } from '../controllers/user.controller.js';

const router = Router();

const profileController = new ProfileController();

// Rota para cadastrar usuario.
router.post('/', async (req, res, next) => profileController.createUser(req, res, next));

// Rota para cadastrar usuario.
router.post('/', async (req, res, next) => profileController.resetPassword(req, res, next));

export default router;
