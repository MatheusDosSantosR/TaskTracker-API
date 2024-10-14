import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { hash } from 'bcrypt';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    // Método para criar um novo usuário
    async authUser(name: string, email: string, password: string) {
        // Verifica se o usuário já existe
        const existingUser = await this.userRepository.findOne({ where: { email } });

        if (existingUser) {
            const error = new Error('E-mail já está em uso');
            (error as any).code = 'ER_DUP_ENTRY';
            throw error;
        }

        // Hash da senha
        const hashedPassword = await hash(password, 10);

        // Criar o novo usuário
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        // Retornar os dados do usuário (sem a senha)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
