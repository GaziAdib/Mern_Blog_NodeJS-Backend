import express from 'express';
import { addReply, createComment, getComments } from '../controllers/commentController.js';


const router = express.Router();

router.post('/:postId/createComment', createComment);

router.get('/:postId/comments', getComments);

router.post('/comments/:commentId/reply', addReply)


export default router;