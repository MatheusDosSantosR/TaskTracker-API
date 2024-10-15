import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { hash } from 'bcrypt';
import { QueryFailedError } from 'typeorm';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se os campos obrigatórios foram preenchidos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Hash da senha
        const hashedPassword = await hash(password, 10); // 10 é o número de salt rounds para segurança

        // Criar a instância do usuário
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        // Salvar no banco de dados
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);
        const data = {
            id: user.id,
            firstName: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        // Retornar o usuário criado (não retornar a senha)
        return res.status(201).json({ msg: "Sucesso ao cadastrar usuario", data });
    } catch (error) {
        // Verifica se o erro é uma violação de chave única (e-mail duplicado)
        if (error instanceof QueryFailedError && error.driverError.code === 'ER_DUP_ENTRY') {
            // Código 23505: Violation of unique constraint (PostgreSQL)
            return res.status(409).json({ message: 'E-mail já está em uso!' });
        }

        return res.status(500).json({ message: 'Erro ao criar o usuário' });
    }
});

export default router;
