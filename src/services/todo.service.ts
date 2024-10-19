import { Repository } from 'typeorm';
import { Todo } from '../entity/Todo.js';
import { User } from '../entity/User.js';
import { Subtask } from '../entity/Subtask.js';
import { AppDataSource } from '../config/data-source.js';
import { UserError } from '../Utils/responseFormatter.js';


export class TodoService {
    private todoRepository: Repository<Todo>;
    private userRepository: Repository<User>;
    private subTaskRepository: Repository<Subtask>;

    constructor() {
        this.todoRepository = AppDataSource.getRepository(Todo);
        this.userRepository = AppDataSource.getRepository(User);
        this.subTaskRepository = AppDataSource.getRepository(Subtask);
    }

    // Criar um novo to-do
    async createTodo(body: Todo, userId: number) {
        const { title, description, priority, dueDate, subtasks } = body;
        // Verificar se o usuário existe
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new UserError('Usuário não encontrado');
        if (!title) throw new UserError('Titulo e obrigatorio!');

        // Criar o todo sem subtasks inicialmente
        const todo = this.todoRepository.create({
            title,
            description,
            priority,
            dueDate,
            user,
        });

        // Salvar o todo (sem subtasks ainda)
        const savedTodo = await this.todoRepository.save(todo);

        // Verificar se há subtasks
        if (subtasks && subtasks.length > 0) {
            // Criar as subtasks e associar ao todo
            const subtasksToSave = subtasks.map(subtask => {
                // Criar a subtask associando ao todo recém-criado
                return this.subTaskRepository.create({
                    ...subtask,
                    todo: savedTodo,
                });
            });
            const savedSubTask = await this.subTaskRepository.save(subtasksToSave);
            savedTodo.subtasks = savedSubTask

        };

        return savedTodo;
    }

    // Atualizar um to-do
    async updateTodo(bodyRequest: Todo, id: string, userId: number) {
        const { title, description, isCompleted, priority, dueDate, subtasks } = bodyRequest;

        // Buscar o Todo específico associado ao userId e ID fornecido
        const todo = await this.todoRepository.findOne({
            where: { id: Number(id), user: { id: userId } },
            relations: ['subtasks'], // Incluir subtasks para manipulação
        });

        // Se o todo não existir, lançar um erro
        if (!todo) throw new UserError('Tarefa não encontrada.');

        // Atualizar os campos do todo
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;
        todo.priority = priority || todo.priority;
        todo.dueDate = dueDate || todo.dueDate;

        // Salvar o todo atualizado e suas subtasks
        const updatedTodo = await this.todoRepository.save(todo);

        // Verificar se há subtasks no bodyRequest
        if (subtasks && subtasks.length > 0) {
            // Atualizar subtasks (adicionar, remover ou editar)
            const subtasksToSave = subtasks.map(subtask => {
                const existingSubtask = todo.subtasks.find((st) => st.id === subtask.id);

                if (existingSubtask) {
                    // Se a subtask já existir, atualize seus campos
                    existingSubtask.title = subtask.title || existingSubtask.title;
                    existingSubtask.isCompleted = subtask.isCompleted !== undefined ? subtask.isCompleted : existingSubtask.isCompleted;
                    return existingSubtask;
                }

                // Se for uma nova subtask, crie-a e associe ao todo
                return this.subTaskRepository.create({
                    ...subtask,
                    todo: updatedTodo
                });
            });

            const createdSubtask = this.subTaskRepository.create(subtasksToSave)
            const saveSubTask = await this.subTaskRepository.save(createdSubtask)
            // Remover subtasks que não estão mais presentes no bodyRequest
            todo.subtasks = saveSubTask;
        }
        // Remover o campo password do user e o campo todo das subtasks no retorno
        const cleanTodo = {
            ...updatedTodo, // Remover senha do usuário
            subtasks: updatedTodo.subtasks?.map(subtask => {
                const { todo, ...subtaskWithoutTodo } = subtask;
                return subtaskWithoutTodo; // Remover o campo todo de cada subtask
            })
        };

        return cleanTodo;
    }

    // Excluir um to-do (soft delete)
    async deleteTodo(id: string, userId: number) {
        const todo = await this.todoRepository.findOneBy({ id: Number(id), user: { id: userId } });
        if (!todo) throw new UserError('Tarefa não encontrado ou já excluído');
        await this.todoRepository.softDelete(id);
        return todo
    }

    // Buscar todos os to-dos de um usuário
    async getTodos(userId: number, params: any) {
        interface IFiltersTodo {
            isCompleted: boolean;
            dueDate: Date | null;
            sortBy: "priority" | "dueDate" | "updatedAt";
            sortDirection: "ASC" | "DESC";
        }

        const { isCompleted, dueDate, sortBy = "updatedAt", sortDirection = "DESC" }: IFiltersTodo = params;
        // Criação da condição base
        const whereCondition: any = {
            user: { id: userId },
            deletedAt: undefined,
        };

        // Adicionando filtros conforme necessário
        if (isCompleted !== undefined) {
            whereCondition.isCompleted = isCompleted;
        }

        if (dueDate != undefined) {
            whereCondition.dueDate = dueDate;
        }

        // Ajustando a ordem da consulta com base nos parâmetros fornecidos
        const orderCondition: any = {};
        orderCondition[sortBy] = sortDirection;

        console.log("where", whereCondition)
        // Realiza a consulta com filtros e ordenação dinâmicos
        return await this.todoRepository.find({
            where: whereCondition,
            relations: ['subtasks', 'comments'],
            order: orderCondition,
        });
    }

}
