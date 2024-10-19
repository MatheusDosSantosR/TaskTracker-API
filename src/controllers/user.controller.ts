import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/user.service.js';
import { SuccessResponse } from '../Utils/responseFormatter.js';

export class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    // Atualiza dados do usuario
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            const userId = req.userLogged.userId;
            const user = await this.profileService.updateUser(name, email, password, userId);
            const data = { id: user.id, name: user.name, email: user.email }
            return res.status(200).json(new SuccessResponse("Dados atualizados com sucesso.", data));
        } catch (error) {
            next(error);
        }
    }

    // Obtem dados do user
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const user = await this.profileService.getUser(userId);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    // Cadastro de usuario
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.profileService.createUser(req.body);
            return res.status(201).json(new SuccessResponse("Usuário cadastrado com sucesso !", data));
        } catch (error) {
            next(error);
        }
    }

    // Recuperação de senha
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const user = await this.profileService.createUser(userId);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    // Envio de email contendo token
    async sendPasswordResetEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.profileService.sendPasswordResetEmail(req.body);
            return res.status(200).json(new SuccessResponse("Email de redefinição de senha enviado com sucesso.", data));
        } catch (error) {
            next(error);
        }
    }
}