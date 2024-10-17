import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { AppDataSource } from '../config/data-source.js';
import { UserError } from '../Utils/responseFormatter.js';

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
}
