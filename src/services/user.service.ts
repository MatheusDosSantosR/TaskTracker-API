import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { AppDataSource } from '../config/data-source.js';
import { UserError } from '../Utils/responseFormatter.js';
import { QueryFailedError } from 'typeorm';

export class ProfileService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    // Obtem dados do usuario
    async getUser(userId: number) {

        // Buscar os dados do usuário no banco de dados
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) throw new UserError('Usuário não encontrado')

        // Retornar os dados do usuário (excluindo a senha)
        return user;
    }

    // Atualizar um usuario
    async updateUser(name: string, email: string, password: string, userId: string) {
        const user = await this.userRepository.findOneBy({ id: Number(userId) });
        if (!user) throw new UserError('Usuario não encontrado');
        if (password.length < 6) throw new UserError('Senha deve conter mais de 6 digitos.')

        // Hash da senha
        const hashedPassword = password ? await hash(password, 10) : null;

        user.name = name || user.name;
        //Adicionar validacao para quando atualizar email para outro que existe no banco
        //user.email = email || user.email;
        //Adicionar criptografias
        user.password = hashedPassword || user.password;

        const saveUser = await this.userRepository.save(user);
        return saveUser
        /*         if (saveUser instanceof QueryFailedError && saveUser.driverError.code === 'ER_DUP_ENTRY') {
                    // Código 23505: Violation of unique constraint (PostgreSQL)
                    return res.status(409).json({ message: 'E-mail já está em uso!' });
                } */
    }

    async createUser(body: { name: string, password: string, email: string }) {
        const { name, email, password } = body;

        // Verificar se os campos obrigatórios foram preenchidos
        if (!name || !email || !password) {
            throw new UserError('Todos os campos são obrigatórios');
        }

        const hashedPassword = await hash(password, 10); // 10 é o número de salt rounds para segurança

        // Criar a instância do usuário
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        // Salvar no banco de dados
        const userRepository = AppDataSource.getRepository(User);
        try {
            await userRepository.save(user);
        }
        catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === 'ER_DUP_ENTRY') {
                throw new UserError('E-mail já está em uso !', 409);
            }
        }

        const data = {
            id: user.id,
            firstName: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return data;

    }
}
