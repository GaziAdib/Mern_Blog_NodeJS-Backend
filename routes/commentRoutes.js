import express from 'express';
import { createComment, getComments } from '../controllers/commentController.js';


const router = express.Router();

router.post('/:postId/createComment', createComment);

router.get('/:postId/comments', getComments);


export default router;