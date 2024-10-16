import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service.js';

export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    // Cria um comentario para uma tarefa
    async createComment(req: Request, res: Response) {
        try {
            const userId = req.userLogged.userId;
            const { comment, todoId } = req.body
            const data = await this.commentService.createComment(comment, todoId, userId);
            return res.status(201).json({ msg: "Tarefa criado com sucesso.", data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar comentario.' });
        }
    }

    //Atualiza um comentario
    async updateComment(req: Request, res: Response) {
        try {
            const userId = req.userLogged.userId;
            const { id } = req.params;
            const commentData = req.body
            const updatedComment = await this.commentService.updateComment(commentData, Number(id), Number(userId));

            return res.status(200).json(updatedComment);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    //Exclui um comentario
    async deleteComment(req: Request, res: Response) {
        try {
            const userId = req.userLogged.userId;
            const { commentId } = req.params;

            await this.commentService.deleteComment(Number(commentId), Number(userId));

            return res.status(200).json({ message: 'Comentário deletado com sucesso' });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    //Lista comentarios de um to-dos
    async getComments(req: Request, res: Response) {
        try {
            const { todoId } = req.params; // Supondo que todoId está nos params

            const comments = await this.commentService.getComments(Number(todoId));

            return res.status(200).json(comments);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

}
