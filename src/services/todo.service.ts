import { Todo } from '../entity/Todo';
import { User } from '../entity/User';
import { AppDataSource } from '../config/data-source';
import { Repository } from 'typeorm';

export class TodoService {
    private todoRepository: Repository<Todo>;
    private userRepository: Repository<User>;

    constructor() {
        this.todoRepository = AppDataSource.getRepository(Todo);
        this.userRepository = AppDataSource.getRepository(User);
    }

    // Criar um novo to-do
    async createTodo(title: string, description: string, userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new Error('Usuário não encontrado');

        const todo = this.todoRepository.create({
            title,
            description,
            user,
        });

        return await this.todoRepository.save(todo);
    }

    // Atualizar um to-do
    async updateTodo(id: string, title: string, description: string, isCompleted: boolean, userId: number) {
        const todo = await this.todoRepository.findOneBy({ id: Number(id), user: { id: userId } });
        if (!todo) throw new Error('To-do não encontrado');

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;

        return await this.todoRepository.save(todo);
    }

    // Excluir um to-do (soft delete)
    async deleteTodo(id: string, userId: number) {
        const todo = await this.todoRepository.findOneBy({ id: Number(id), user: { id: userId } });
        if (!todo) throw new Error('Tarefa não encontrado ou já excluído');
        await this.todoRepository.softDelete(id);
        return todo
    }

    // Buscar todos os to-dos de um usuário
    async getTodos(userId: number) {
        return await this.todoRepository.find({
            where: { user: { id: userId }, deletedAt: undefined },
            order: { updatedAt: 'DESC' }
        });
    }
}
