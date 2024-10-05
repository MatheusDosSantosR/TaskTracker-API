import { Request, Response } from 'express';
import Todo from '../models/todoModel';

/* export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter tarefas.' });
  }
}; */

// Métodos adicionais: getTodoById, updateTodo, deleteTodo
