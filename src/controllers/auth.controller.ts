import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { SuccessResponse } from '../Utils/responseFormatter.js';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // Método para criar um novo usuário
    async authUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.authService.authUser(req.body)
            return res.status(200).json(new SuccessResponse('Logado com sucesso !', data));
        } catch (error) {
            next(error);
        }
    }
}
