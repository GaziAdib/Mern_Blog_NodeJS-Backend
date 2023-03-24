import express from 'express';
import { addReply, createComment, getComments, deleteReply } from '../controllers/commentController.js';


const router = express.Router();

router.post('/:postId/createComment', createComment);

router.get('/:postId/comments', getComments);

router.put('/:commentId/reply', addReply)

router.delete('/:commentId/replies/:replyId', deleteReply)


export default router;