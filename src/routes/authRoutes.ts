import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { compare } from 'bcrypt'; // Para comparar a senha com o hash no banco de dados
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o email e a senha foram enviados
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        // Buscar o usuário pelo email
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Comparar a senha fornecida com o hash armazenado
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email }, // Payload do JWT
            JWT_SECRET, // Chave secreta
            { expiresIn: '1h' } // Token válido por 1 hora
        );

        // Retornar o token ao cliente
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

export default router;
