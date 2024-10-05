import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        //const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
        //console.log("decodedc", decoded)
        //req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.', debug: error });
    }
};
