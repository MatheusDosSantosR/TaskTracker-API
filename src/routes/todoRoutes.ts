import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { Todo } from '../entity/Todo';
import { User } from '../entity/User';
const router = Router();

// 1. Criar um novo to-do
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;

        if (!title) {
            return res.status(400).json({ message: 'O título é obrigatório' });
        }

        // Buscar o usuário autenticado
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Criar um novo to-do
        const todoRepository = AppDataSource.getRepository(Todo);
        const newTodo = todoRepository.create({
            title,
            description,
            user,
        });

        await todoRepository.save(newTodo);
        return res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar o to-do' });
    }
});

// 2. Atualizar um to-do existente
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;
        const userId = req.user.userId;

        const todoRepository = AppDataSource.getRepository(Todo);

        // Buscar o to-do do usuário autenticado
        const todo = await todoRepository.findOne({ where: { id, user: { id: userId }, deletedAt: null } });

        if (!todo) {
            return res.status(404).json({ message: 'To-do não encontrado' });
        }

        // Atualizar os campos do to-do
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;

        await todoRepository.save(todo);
        return res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar o to-do' });
    }
});

// 3. Excluir (soft delete) um to-do
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const todoRepository = AppDataSource.getRepository(Todo);

        // Verificar se o to-do existe e pertence ao usuário
        const todo = await todoRepository.findOne({ where: { id, user: { id: userId }, deletedAt: null } });

        if (!todo) {
            return res.status(404).json({ message: 'To-do não encontrado ou já excluído' });
        }

        // Realizar o soft delete
        await todoRepository.softDelete(id);

        return res.status(200).json({ message: 'To-do excluído com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir o to-do' });
    }
});

// 4. Listar todos os to-dos do usuário autenticado (não excluídos)
router.get('/', async (req, res) => {
    try {
        const userId = req.user.userId;

        const todoRepository = AppDataSource.getRepository(Todo);

        // Buscar todos os to-dos não excluídos do usuário
        const todos = await todoRepository.find({
            where: { user: { id: userId }, deletedAt: null },
            order: { createdAt: 'DESC' },
        });

        return res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar os to-dos' });
    }
});

export default router;
