import express from 'express';
import { createPost, getPostById, getPosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/create', createPost);

router.get('/posts', getPosts);

router.get('/:postId', getPostById);





export default router;