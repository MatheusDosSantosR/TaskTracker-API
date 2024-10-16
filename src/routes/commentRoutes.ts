import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller.js';

const router = Router();
const commentController = new CommentController();

router.post('/', (req, res) => commentController.createComment(req, res));
router.put('/:id', (req, res) => commentController.updateComment(req, res));
router.delete('/:id', (req, res) => commentController.deleteComment(req, res));
router.get('/', (req, res) => commentController.getComments(req, res));

export default router;