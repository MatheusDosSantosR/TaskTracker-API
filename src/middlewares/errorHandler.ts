import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source'; // Importar a fonte de dados
import { Log } from '../entity/Log';

export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const logRepository = AppDataSource.getRepository(Log);

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

    // Salvar o log no banco de dados
    await logRepository.save(log);

    // Retornar resposta ao cliente
    res.status(err.status || 500).json({
        error: err.message || 'Erro interno do servidor',
    });
}
