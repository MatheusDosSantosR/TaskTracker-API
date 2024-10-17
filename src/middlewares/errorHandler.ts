import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source'; // Importar a fonte de dados
import { Log } from '../entity/Log';
import { UserError, ErrorResponse } from 'Utils/responseFormatter';

export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const logRepository = AppDataSource.getRepository(Log);
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Erro interno do servidor.';

    // Criar a mensagem de log
    const log = logRepository.create({
        message: err.message || 'Erro desconhecido',
        level: 'error',
        context: JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            query: req.query,
            params: req.params,
            stack: err.stack, 
        }),
    });

    if (err instanceof UserError) {
        statusCode = err.statusCode; // Status 400 ou outro especificado
        message = err.message; // Mensagem do erro do usuário
    }
    // Salvar o log no banco de dados
    await logRepository.save(log);

    // Retornar resposta ao cliente
    res.status(statusCode).json({
        status: 'error',
        message: message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}
