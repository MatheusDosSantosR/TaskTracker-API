import { AppDataSource } from '../config/data-source';
import { Todo } from '../entity/Todo';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

export class ProfileService {
    private todoRepository: Repository<Todo>;
    private userRepository: Repository<User>;

    constructor() {
        this.todoRepository = AppDataSource.getRepository(Todo);
        this.userRepository = AppDataSource.getRepository(User);
    }

    // Obtem dados do usuario
    async getUser(userId: number) {

        // Buscar os dados do usuário no banco de dados
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return { message: 'Usuário não encontrado' };
        }

        // Retornar os dados do usuário (excluindo a senha)
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    // Atualizar um usuario
    async updateUser(name: string, email: string, password: string, userId: string) {
        const user = await this.userRepository.findOneBy({ id: Number(userId) });
        if (!user) throw new Error('Usuario não encontrado');

        // Hash da senha
        const hashedPassword = password ? await hash(password, 10) : null;

        user.name = name || user.name;
        user.email = email || user.email;
        //Adicionar criptografia
        user.password = hashedPassword || user.password;

        return await this.userRepository.save(user);
    }
}
