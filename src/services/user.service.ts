import { hash } from 'bcrypt';
import crypto from 'crypto';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../entity/User.js';
import { AppDataSource } from '../config/data-source.js';
import { UserError } from '../Utils/responseFormatter.js';
import { QueryFailedError } from 'typeorm';
import nodemailer from 'nodemailer';


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

    async resetPassword(token: string, newPassword: string) {

        if (!token) throw new UserError('Token é obrigatório!');
        if (!newPassword) throw new UserError('A nova senha é obrigatório!');
        if (newPassword.length < 6) throw new UserError('Senha deve conter mais de 6 digitos.');

        // Buscar o usuário pelo token de redefinição
        const user = await this.userRepository.findOne({
            where: {
                resetToken: token,
                resetTokenExpires: MoreThan(new Date()), // Verifica se o token ainda é válido
            },
        });

        if (!user) throw new UserError('Token inválido ou expirado.');

        // Criptografar a nova senha
        const hashedPassword = await hash(newPassword, 10);

        // Atualizar a senha e remover o token de redefinição
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await this.userRepository.save(user);

        return {
            id: user.id,
            firstName: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    async sendPasswordResetEmail(body: { email: string }) {
        const { email } = body;

        if (!email) throw new UserError('Campo email e obrigatório!');
        // Verificar se o usuário existe no banco de dados
        const user = await this.userRepository.findOneBy({ email });

        if (!user) throw new UserError('Usuário não encontrado.', 404);

        // Gerar token de redefinição
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Definir o token e a data de expiração
        user.resetToken = resetToken;
        user.resetTokenExpires = new Date(Date.now() + 3600000); // Token válido por 1 hora
        await this.userRepository.save(user);
        // Configurar o envio de email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, // Definir como true para SSL
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const resetLink = `${process.env.BASE_URL}reset-password/${resetToken}`;

        // Enviar o email com o link de redefinição
        await transporter.sendMail({
            to: email,
            subject: 'Redefinição de senha',
            text: `Você solicitou a redefinição de senha. Acesse o link para redefinir sua senha: ${resetLink}`,
        });

        //Se existir a variavel Security retorna o token
        //Utilizar para testes automatizados.
        if (process.env.SMT_SECURITY) {
            return { resetToken }
        }

        return true;

    }
}
