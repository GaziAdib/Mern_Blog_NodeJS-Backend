import express from 'express';

// DotEnv module
import dotenv from 'dotenv';

import cors from 'cors';

import db from './db/db.js';

import postRoutes from './routes/postRoutes.js';

import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();

db();


// middlewares
app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

app.get('/hellow', (req, res) => {
    return res.json({ message: 'hellow' })
});


app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `server is running on port: ${PORT}`);
