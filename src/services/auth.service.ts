import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { User } from '../entity/User.js';
import { AppDataSource } from '../config/data-source.js';
import { UserError } from 'Utils/responseFormatter.js';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    // Método para autenticar um usuário
    async authUser(body: User) {

        const { email, password } = body
        // Verificar se o email e a senha foram enviados
        if (!email || !password) {
            throw new UserError('Email e senha são obrigatórios');
        }

        // Verifica se o usuário já existe
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'name']
        });

        if (!user) {
            throw new UserError('Credenciais inválidas !', 401);
        }

        // Comparar a senha fornecida com o hash armazenado
        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UserError('Senha inválida!', 401);
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email }, // Payload do JWT
            JWT_SECRET, // Chave secreta
            { expiresIn: '10h' } // Token válido por 1 hora
        );

        const removePass = {
            id: user.id,
            email: user.email,
            name: user.name
        }

        const data = {
            token: token,
            user: removePass
        }

        return data
    }
}
