import { Router } from 'express';
import { ProfileController } from '../controllers/user.controller.js';

const router = Router();
const profileController = new ProfileController();
// Rota para recuperar os dados do perfil do usuário autenticado
router.get('/', async (req, res, next) => profileController.getUser(req, res, next));

//Rota para atualizar os dados do perfil
router.put('/', async (req, res, next) => profileController.updateUser(req, res, next));

export default router;
