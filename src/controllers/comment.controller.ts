import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service.js';
import { SuccessResponse } from 'Utils/responseFormatter.js';
export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    // Cria um comentario para uma tarefa
    async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const { comment, todoId } = req.body
            const data = await this.commentService.createComment(comment, todoId, userId);
            return res.status(201).json(new SuccessResponse('Comentário criado com sucesso!', data));
        } catch (error) {
            next(error)
        }
    }

    //Atualiza um comentario
    async updateComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const { id } = req.params;
            const commentData = req.body
            const data = await this.commentService.updateComment(commentData, Number(id), Number(userId));

            return res.status(200).json(new SuccessResponse('Comentário atualiza com sucesso!', data));
        } catch (error) {
            next(error);
        }
    }

    //Exclui um comentario
    async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.userLogged.userId;
            const { commentId } = req.params;
            const data = await this.commentService.deleteComment(Number(commentId), Number(userId));

            return res.status(200).json(new SuccessResponse('Comentário deletado com sucesso!', data));
        } catch (error) {
            next(error);
        }
    }

    //Lista comentarios de um to-dos
    async getComments(req: Request, res: Response, next: NextFunction) {
        try {
            const { todoId } = req.params; // Supondo que todoId está nos params

            const comments = await this.commentService.getComments(Number(todoId));

            return res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }

}