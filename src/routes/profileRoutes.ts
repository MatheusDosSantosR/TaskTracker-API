import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const router = Router();

// Rota para recuperar os dados do perfil do usuário autenticado
router.get('/', async (req, res) => {
    try {
        console.log("request", req.user)
        // O `authMiddleware` já garante que `req.user` tem os dados do token decodificado
        const userId = req.user.userId;

        // Buscar os dados do usuário no banco de dados
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retornar os dados do usuário (excluindo a senha)
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar perfil do usuário' });
    }
});

export default router;
