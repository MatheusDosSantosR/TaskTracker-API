import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller.js';

const router = Router();
const profileController = new ProfileController();
// Rota para recuperar os dados do perfil do usuário autenticado
router.get('/', async (req, res) => profileController.getUser(req, res));

//Rota para atualizar os dados do perfil
router.put('/', async (req, res) => profileController.updateUser(req, res));
export default router;
