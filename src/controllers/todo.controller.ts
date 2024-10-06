import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    // Cria um novo to-do
    async createTodo(req: Request, res: Response) {
        try {
            const { title, description } = req.body;
            const userId = req.user.userId;
            const todo = await this.todoService.createTodo(title, description, userId);
            return res.status(201).json(todo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar o to-do' });
        }
    }

    // Atualiza um to-do
    async updateTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, description, isCompleted } = req.body;
            const userId = req.user.userId;
            const todo = await this.todoService.updateTodo(id, title, description, isCompleted, userId);
            return res.status(200).json(todo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar o to-do' });
        }
    }

    // Exclui (soft delete) um to-do
    async deleteTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            await this.todoService.deleteTodo(id, userId);
            return res.status(200).json({ message: 'To-do excluído com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao excluir o to-do' });
        }
    }

    // Lista todos os to-dos de um usuário
    async getTodos(req: Request, res: Response) {
        try {
            const userId = req.user.userId;
            const todos = await this.todoService.getTodos(userId);
            return res.status(200).json(todos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar os to-dos' });
        }
    }
}
