import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services/todo.service.js';
import { SuccessResponse } from '../Utils/responseFormatter.js';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    // Cria um novo to-do
    async createTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const data = await this.todoService.createTodo(req.body, userId);
            return res.status(201).json(new SuccessResponse("Tarefa criado com sucesso.", data));
        } catch (error) {
            next(error);
        }
    }

    // Atualiza um to-do
    async updateTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = req.userLogged.userId;
            const data = await this.todoService.updateTodo(req.body, id, userId);
            return res.status(200).json(new SuccessResponse("Tarefa atualizada com sucesso.", data));
        } catch (error) {
            next(error);
        }
    }

    // Exclui (soft delete) um to-do
    async deleteTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = req.userLogged.userId;
            const data = await this.todoService.deleteTodo(id, userId);
            return res.status(200).json(new SuccessResponse('Tarefa excluída com sucesso.', data));
        } catch (error) {
            next(error);
        }
    }

    // Lista todos os to-dos de um usuário
    async getTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const todos = await this.todoService.getTodos(userId, req.query);
            return res.status(200).json(todos);
        } catch (error) {
            next(error);
        }
    }
}
