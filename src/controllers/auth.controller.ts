import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { compare } from 'bcrypt'; // Para comparar a senha com o hash no banco de dados
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // Método para criar um novo usuário
    async authUser(req: Request, res: Response) {
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
            return res.status(500).json({ message: 'Não foi possivel autenticar.' });
        }
    }
}
