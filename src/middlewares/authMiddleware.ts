import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// A chave secreta usada para assinar o JWT (a mesma usada na geração do token)
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extrair o token do cabeçalho Authorization (formato: "Bearer <token>")
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1]; // Pegamos a segunda parte (o token)

        if (!token) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Verificar o token JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // Adicionar os dados do token decodificado ao objeto `req` para uso posterior
        req.user = decoded;

        // Chamar o próximo middleware ou rota
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};
