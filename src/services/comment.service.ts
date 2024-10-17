import { Repository } from 'typeorm';
import { Comment } from '../entity/Comment.js';
import { User } from '../entity/User.js';
import { Todo } from '../entity/Todo.js';
import { AppDataSource } from '../config/data-source.js';
import { UserError } from '../Utils/responseFormatter.js';

export class CommentService {
    private todoRepository: Repository<Todo>;
    private commentRepository: Repository<Comment>;
    private userRepository: Repository<User>;

    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comment);
        this.userRepository = AppDataSource.getRepository(User);
        this.todoRepository = AppDataSource.getRepository(Todo);
    }

    // Criar um comentario para um to-dos
    async createComment(comment: string, todoId: number, userId: number) {

        // Verificar se o usuário existe
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new UserError('Usuário não encontrado');

        // Verificar se o todo (tarefa) existe
        const todo = await this.todoRepository.findOneBy({ id: todoId });
        if (!todo) throw new UserError('Tarefa não encontrada');

        // Criar o comentário associando o usuário e a tarefa (todo)
        const createComment = this.commentRepository.create({
            comment,
            user,
            todo
        });

        // Salvar o comentário
        const saveComment = await this.commentRepository.save(createComment);
        return saveComment;
    }

    //Atualiza um comentario
    async updateComment(body: Comment, commentId: number, userId: number) {
        const { comment } = body;

        // Verificar se o comentário existe e está associado ao usuário
        const existingComment = await this.commentRepository.findOne({
            where: { id: commentId, user: { id: userId } },
            relations: ['user', 'todo'],
        });
        if (!existingComment) throw new UserError('Comentário não encontrado ou usuário sem permissão');

        // Atualizar o comentário
        existingComment.comment = comment || existingComment.comment;

        // Salvar o comentário atualizado
        const updatedComment = await this.commentRepository.save(existingComment);
        return updatedComment;
    }

    //Exclui um comentario
    async deleteComment(commentId: number, userId: number) {
        // Verificar se o comentário existe e está associado ao usuário
        const comment = await this.commentRepository.findOne({
            where: { id: commentId, user: { id: userId } },
        });
        if (!comment) throw new UserError('Comentário não encontrado ou usuário sem permissão');

        // Deletar o comentário
        const deleteComment = await this.commentRepository.remove(comment);
        return deleteComment;
    }

    //Obtem todos os comentarios
    async getComments(todoId: number) {
        // Verificar se o todo (tarefa) existe
        const todo = await this.todoRepository.findOne({ where: { id: todoId } });
        if (!todo) throw new UserError('Tarefa não encontrada');

        // Buscar todos os comentários associados a este todo
        const comments = await this.commentRepository.find({
            where: { todo: { id: todoId } },
            relations: ['user'], // Para trazer informações do usuário que fez o comentário
            order: { createdAt: 'DESC' },
        });

        return comments;
    }



}